#!/usr/bin/env node
'use strict';

// http://offirmo.net/wiki/index.php?title=Express.js
// http://expressjs.com/4x/api.html

console.log('Hello world !');

var _ = require('lodash');
var express = require('express');
var passport = require('passport');


var LISTENING_PORT = 3000;

// http://stackoverflow.com/questions/3653065/get-local-ip-address-in-node-js
// http://nodejs.org/api/os.html#os_os_networkinterfaces
var local_ips = _.chain(require('os').networkInterfaces())
	.values()
	.flatten()
	.map('address')
	.value();


/////////////////////////////////////////////

var passport_router = require('./passport-router');
var sub_router = require('./sub-router');
var meta_router = require('../--mini_incubator/meta-routes');


/////////////////////////////////////////////

var app = express();


app.use(require('body-parser').urlencoded({ extended: true }) ); //< needed for passport to work !
app.use(require('cookie-parser')());
//app.use(express.session({ secret: 'keyboard cat' }));
app.use(passport.initialize());

/* TODO
app.use(passport.session());

passport.serializeUser(function(user, done) {
	done(null, user.id);
});

passport.deserializeUser(function(id, done) {
	User.findById(id, function(err, user) {
		done(err, user);
	});
});
*/

app.get('/', (req, res) => {
	res.send(`
<!DOCTYPE html>
<head>
	<title>lib_passport_001</title>
	<style type="text/css">
		body {
			margin: 40px;
			font-family: "Lucida Sans Unicode", "Lucida Grande", sans-serif;
			color: #333;
		}
	</style>
</head>

<h1>...</h1>
<li><a>${req.baseUrl}/login</a>

<script>
	document.querySelector('h1').textContent = document.title;
	Array.prototype.forEach.call(document.querySelectorAll('a'), function(el) {
		el.href || (el.href = el.text);
	});
</script>
	`);
});

app.use('/', passport_router);
app.use('/router', sub_router);
app.use('/meta', meta_router);

/////////////////////////////////////////////

app.listen(LISTENING_PORT);

/////////////////////////////////////////////

_.forEach(local_ips, (ip) => {
	console.log('Listening on http://' + ip + ':' + LISTENING_PORT);
});
console.log('(Ctrl+C to stop)');
