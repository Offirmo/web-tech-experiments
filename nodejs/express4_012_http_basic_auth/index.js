#!/usr/bin/env node
'use strict';

// a page protected by http basic auth
// https://en.wikipedia.org/wiki/Basic_access_authentication

console.log('Hello world !')

var _ = require('lodash')

// https://stackoverflow.com/questions/3653065/get-local-ip-address-in-node-js
// https://nodejs.org/api/os.html#os_os_networkinterfaces
var local_ips = _.chain(require('os').networkInterfaces())
	.values()
	.flatten()
	.map('address')
	.value()


// https://expressjs.com/4x/api.html

var listening_port = 3000
var express = require('express')
var app = express()


function requireBasicHttpAuth(realm, res) {
	res.writeHead(401, {
		'WWW-Authenticate': 'Basic realm="' + realm + '"',
		'Cache-Control': 'no-cache, no-store, must-revalidate',
		'Pragma': 'no-cache',
		'Expires': 0
	})
	res.end()
}
app.get('/', function(req, res) {
	const allowed = false // so far

	if (!req.headers.authorization) return requireBasicHttpAuth('offirmo-wte', res)

	console.log(req.headers.authorization, req.headers.authorization.split('Basic '))

	var currentAuthB64 = req.headers.authorization.split('Basic ')[1]
	var currentAuth = new Buffer(currentAuthB64, 'base64').toString('utf8')
	console.log(currentAuthB64, currentAuth)

	if (currentAuth !== 'foo:bar') return requireBasicHttpAuth('offirmo-wte', res)

	res.send('Successfully authenticated !')
});

_.forEach(local_ips, function(ip) {
	console.log('Listening on https://' + ip + ':' + listening_port);
});
console.log('(Ctrl+C to stop)');

app.listen(listening_port);
