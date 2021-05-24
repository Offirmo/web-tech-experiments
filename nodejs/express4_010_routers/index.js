#!/bin/sh
':' //# https://sambal.org/?p=1014 ; exec /usr/bin/env node --harmony_modules --harmony_regexps --harmony_proxies --harmony_sloppy_function --harmony_sloppy_let --harmony_unicode_regexps --harmony_reflect --harmony_destructuring --harmony_default_parameters --harmony_sharedarraybuffer --harmony_atomics --harmony_simd "$0" "$@"
'use strict';

// https://offirmo.net/wiki/index.php?title=Express.js
// https://expressjs.com/4x/api.html

console.log('Hello world !');

var _ = require('lodash');
var express = require('express');


var LISTENING_PORT = 3000;

// https://stackoverflow.com/questions/3653065/get-local-ip-address-in-node-js
// https://nodejs.org/api/os.html#os_os_networkinterfaces
var local_ips = _.chain(require('os').networkInterfaces())
	.values()
	.flatten()
	.map('address')
	.value();



/////////////////////////////////////////////

var sub_router = require('./sub-router');
var meta_router = require('../--mini_incubator/meta-routes');
var sub_app = require('./sub-app');


/////////////////////////////////////////////

var app = express();

app.get('/', function(req, res) {
	res.send(`
<!DOCTYPE html>
<head>
	<title>advanced routing</title>
	<style type="text/css">
		body {
			margin: 40px;
			font-family: "Lucida Sans Unicode", "Lucida Grande", sans-serif;
			color: #333;
		}
	</style>
</head>

<h1>...</h1>
<li><a>${req.baseUrl}/router</a>
<li><a>${req.baseUrl}/meta</a>
<li><a>${req.baseUrl}/app</a>

<script>
	document.querySelector('h1').textContent = document.title;
	Array.prototype.forEach.call(document.querySelectorAll('a'), function(el) {
		el.href || (el.href = el.text);
	});
</script>
	`);
});

app.use('/router', sub_router);
app.use('/meta', meta_router);
app.use('/app', sub_app);

/////////////////////////////////////////////

app.listen(LISTENING_PORT);

/////////////////////////////////////////////

_.forEach(local_ips, function(ip) {
	console.log('Listening on https://' + ip + ':' + LISTENING_PORT);
});
console.log('(Ctrl+C to stop)');
