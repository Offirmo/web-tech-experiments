#!/usr/bin/env node
'use strict';

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
	.map('address')
	.value();


/////////////////////////////////////////////

var sub_router = require('./sub-router');
var meta_router = require('../--mini_incubator/meta-routes');


/////////////////////////////////////////////

var app = express();

app.get('/', function(req, res) {
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

app.use('/router', sub_router);
app.use('/meta', meta_router);

/////////////////////////////////////////////

app.listen(LISTENING_PORT);

/////////////////////////////////////////////

_.forEach(local_ips, function(ip) {
	console.log('Listening on http://' + ip + ':' + LISTENING_PORT);
});
console.log('(Ctrl+C to stop)');
