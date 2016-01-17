#!/usr/bin/env node
//'use strict'; disabled for accessing current function name

// advanced pipelines with the express router
// http://offirmo.net/wiki/index.php?title=Express.js
// http://expressjs.com/4x/api.html

console.log('Hello world !');

var _ = require('lodash');
var express = require('express');

var LISTENING_PORT = 3000;

// http://stackoverflow.com/questions/3653065/get-local-ip-address-in-node-js
// http://nodejs.org/api/os.html#os_os_networkinterfaces
var local_ips = _.chain(require('os').networkInterfaces())
	.values()
	.flatten()
	.pluck('address')
	.value();

// http://stackoverflow.com/a/1013370/587407
function getFunctionName() {
	var re = /function (.*?)\(/;
	var s = getFunctionName.caller.toString();
	var m = re.exec( s );
	console.log(' | ' + m[1]);
	return m[1];
}



/////////////////////////////////////////////

var router = new express.Router();

router.get('/',
	noerr_init,
	function root_get(req, res) {
		res.steps.push(getFunctionName());

		res.send('hello from router !');

		console.log(res.steps);
	}
);

router.get('/simple-pipeline', // --> work as expected
	noerr_init,
	noerr_step_sendNot_nextYes,
	noerr_step_sendHLW_nextNOT_display_chain,

	error_step_send500_nextNOT_display_chain
);

router.get('/what-if-next-at-end', // --> next of parent OR integrated "catch all"
	noerr_init,
	noerr_step_sendNot_nextYes,

	error_step_send500_nextNOT_display_chain
);

router.get('/what-if-no-send', // --> timeout loading page
	noerr_init,
	noerr_step_sendNot_nextYes,
	noerr_step_sendNot_nextNOT_display_chain,

	error_step_send500_nextNOT_display_chain
);

router.get('/what-if-multiple-send', // --> the 1st one win, then an error is triggered
	noerr_init,
	noerr_step_sendHLW_nextYES,
	noerr_step_sendHLW_nextYES,
	noerr_step_sendHLW_nextNOT_display_chain,

	error_step_send500_nextNOT_display_chain
);

router.get('/what-if-err', // --> branch to error handler, as expected
	noerr_init,
	noerr_step_sendNot_nextYes,
	noerr_step_sendNot_nextERR,
	noerr_step_sendHLW_nextNOT_display_chain,

	error_step_send500_nextNOT_display_chain
);

router.get('/what-if-err-pipeline', // --> ??? "Cannot GET /what-if-err-pipeline"
	noerr_init,
	noerr_step_sendNot_nextYes,
	noerr_step_sendNot_nextERR,
	noerr_step_sendHLW_nextNOT_display_chain,

	error_step_sendNOT_nextYES, // < XXX
	error_step_send500_nextNOT_display_chain
);

router.get('/what-if-err-pipeline-v2', // --> work as expected -> OK, next must be called with err
	noerr_init,
	noerr_step_sendNot_nextYes,
	noerr_step_sendNot_nextERR,
	noerr_step_sendHLW_nextNOT_display_chain,

	error_step_sendNOT_nextERR, // < change
	error_step_send500_nextNOT_display_chain
);

router.get('/complex-pipeline', // --> work as expected
	noerr_init,
	noerr_step_sendNot_nextYes,
	noerr_step_sendHLW_nextYES,
	noerr_step_sendNot_nextNOT_display_chain, //< called OK

	error_step_sendNOT_nextERR,
	error_step_send500_nextNOT_display_chain
);



var HLW_count = 0;

function noerr_init(req, res, next) {
	//console.log('\n---------')
	res.steps = res.steps || [];
	res.steps.push(getFunctionName());

	next();
}

function noerr_step_sendHLW_nextNOT_display_chain(req, res, next) {
	HLW_count++;
	res.steps.push(getFunctionName() + '#' + HLW_count);

	res.send('hello world #' + HLW_count);
	console.log(res.steps);
}

function noerr_step_sendHLW_nextYES(req, res, next) {
	HLW_count++;
	res.steps.push(getFunctionName() + '#' + HLW_count);

	res.send('hello world #' + HLW_count);
	next();
}

function noerr_step_sendNot_nextYes(req, res, next) {
	res.steps.push(getFunctionName());

	next();
}

function noerr_step_sendNot_nextNOT_display_chain(req, res, next) {
	res.steps.push(getFunctionName());

	console.log(res.steps);
}

function noerr_step_sendNot_nextERR(req, res, next) {
	res.steps.push(getFunctionName());

	next(new Error('error from ' + getFunctionName()));
}

function error_step_send500_nextNOT_display_chain(err, req, res, next) {
	res.steps.push(getFunctionName());

	try {
		res.status(500).send(err.message);
	}
	catch (e) {
		console.warn('while trying to send error :', e);
	}
	console.log(res.steps);
}

function error_step_sendNOT_nextYES(err, req, res, next) {
	res.steps.push(getFunctionName());

	console.log(res.steps);
	next(); // XXX questionnable
}

function error_step_sendNOT_nextERR(err, req, res, next) {
	res.steps.push(getFunctionName());

	console.log(res.steps);
	next(err);
}



/////////////////////////////////////////////

var app = express();

app.use(function (req, res, next) {
	console.log('\n *');
	next();
});

app.use(noerr_init);

app.get('/', function root_get(req, res) {
		res.steps.push(getFunctionName());

		res.send('hello from app !');

		console.log(res.steps);
	}
);

app.get('/throw', function(req, res, next) {
	throw new Error('test : error !');
});


app.use('/r1', router);

app.use(function root_catch_all(req, res, next) {
	res.steps = res.steps || [];
	res.steps.push(getFunctionName());

	res.status(404).send('404');
	console.log(res.steps);
});

app.use(function root_catch_all_err(err, req, res, next) {
	res.steps = res.steps || [];
	res.steps.push(getFunctionName());

	console.error(err);
	console.log(res.steps);


	try {
		res.status(err.status || 500).send({ error: err });
	}
	catch (e) {
		console.warn('while trying to send error :', e);
	}

	console.log(res.steps);
});


/////////////////////////////////////////////

app.listen(LISTENING_PORT);

/////////////////////////////////////////////

_.forEach(local_ips, function(ip) {
	console.log('Listening on http://' + ip + ':' + LISTENING_PORT);
});
console.log('(Ctrl+C to stop)');




/*
 next alors que pas de next ?

 next en erreur ?

 double send ?
 */
