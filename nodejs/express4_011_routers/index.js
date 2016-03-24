#!/bin/sh
':' //# http://sambal.org/?p=1014 ; exec /usr/bin/env node --harmony_modules --harmony_regexps --harmony_proxies --harmony_sloppy_function --harmony_sloppy_let --harmony_unicode_regexps --harmony_reflect --harmony_destructuring --harmony_default_parameters --harmony_sharedarraybuffer --harmony_atomics --harmony_simd "$0" "$@"
'use strict';

// http://offirmo.net/wiki/index.php?title=Express.js
// http://expressjs.com/4x/api.html

console.log('Hello world !');

var _ = require('lodash');
var express = require('express');
var http = require('http');


var LISTENING_PORT = 3000;

// http://stackoverflow.com/questions/3653065/get-local-ip-address-in-node-js
// http://nodejs.org/api/os.html#os_os_networkinterfaces
var local_ips = _.chain(require('os').networkInterfaces())
	.values()
	.flatten()
	.map('address')
	.value();



/////////////////////////////////////////////

var router = require('./routes');

/////////////////////////////////////////////

const app = express();
const server = http.createServer(app);

app.use(router);

/////////////////////////////////////////////

// TODO listen to more server events !
server.listen(LISTENING_PORT, function() {
	_.forEach(local_ips, function(ip) {
		console.log('Listening on http://' + ip + ':' + LISTENING_PORT);
	});
});

/////////////////////////////////////////////

console.log('(Ctrl+C to stop)');

