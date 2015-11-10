#!/usr/bin/env node
//'use strict';

// a minimal "hello world" express app

console.log('Hello world !');

var _ = require('lodash');

// http://stackoverflow.com/questions/3653065/get-local-ip-address-in-node-js
// http://nodejs.org/api/os.html#os_os_networkinterfaces
var local_ips = _.chain(require('os').networkInterfaces())
	.values()
	.flatten()
	.pluck('address')
	.value();

// http://stackoverflow.com/a/1013370/587407
function getFunctionName() {
	var re = /function (.*?)\(/
	var s = getFunctionName.caller.toString();
	var m = re.exec( s )
	return m[1];
}


// http://expressjs.com/4x/api.html

var listening_port = 3000;
var express = require('express');
var app = express();

app.get('/', function(req, res) {
	res.send('hello world');
});

app.get('/simple-pipeline', // --> work as expected
	noerr_init,
	noerr_step_sendNot_nextYes,
	noerr_step_sendHLW_nextNOT_display_chain,

	error_step_send500_nextNOT_display_chain
);

app.get('/what-if-no-send', // --> timeout loading page
	noerr_init,
	noerr_step_sendNot_nextYes,
	noerr_step_sendNot_nextNOT_display_chain,

	error_step_send500_nextNOT_display_chain
);

app.get('/what-if-err', // --> branch to error handler
	noerr_init,
	noerr_step_sendNot_nextYes,
	noerr_step_sendNot_nextERR,
	noerr_step_sendHLW_nextNOT_display_chain,

	error_step_send500_nextNOT_display_chain
);

app.get('/what-if-err-pipeline', // --> ??? "Cannot GET /what-if-err-pipeline"
	noerr_init,
	noerr_step_sendNot_nextYes,
	noerr_step_sendNot_nextERR,
	noerr_step_sendHLW_nextNOT_display_chain,

	error_step_sendNOT_nextYES, // < XXX
	error_step_send500_nextNOT_display_chain
);

app.get('/what-if-err-pipeline-v2', // --> work as expected -> OK, next must be called with err
	noerr_init,
	noerr_step_sendNot_nextYes,
	noerr_step_sendNot_nextERR,
	noerr_step_sendHLW_nextNOT_display_chain,

	error_step_sendNOT_nextERR, // < change
	error_step_send500_nextNOT_display_chain
);

app.get('/complex-pipeline', // --> work as expected
	noerr_init,
	noerr_step_sendNot_nextYes,
	noerr_step_sendHLW_nextYES,
	noerr_step_sendNot_nextNOT_display_chain, //< called OK

	error_step_sendNOT_nextERR,
	error_step_send500_nextNOT_display_chain
);




function noerr_init(req, res, next) {
	res.steps = [ ];
	res.steps.push(getFunctionName());

	next();
}

function noerr_step_sendHLW_nextNOT_display_chain(req, res, next) {
	res.steps.push(getFunctionName());

	res.send('hello world');
	console.log(res.steps);
}

function noerr_step_sendHLW_nextYES(req, res, next) {
	res.steps.push(getFunctionName());

	res.send('hello world');
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

	res.status(500).send(err.message);
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




_.forEach(local_ips, function(ip) {
	console.log('Listening on http://' + ip + ':' + listening_port);
});
console.log('(Ctrl+C to stop)');

app.listen(listening_port);



/*
 next alors que pas de next ?

 next en erreur ?

 double send ?
 */
