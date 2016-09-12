#!/usr/bin/env node
'use strict'

////////////////////////////////////

var _ = require('lodash')
var express = require('express')

////////////

var listening_port = process.env.PORT || 7000

////////////////////////////////////

process.on('uncaughtException', (err) => {
	console.error(err)
	process.exit(1)
})
process.on('unhandledRejection', (reason, p) => {
	console.error('Unhandled Rejection at: Promise', p, 'reason:', reason)
	process.exit(1)
})

////////////

var app = express()

////////////

app.get('/', (req, res) => {
	res.send('hello world')
})

app.get('/best-locales', (req, res) => {
	res.send({
		data: 'hello world',
		meta: {
			
		}
	})
})

////////////////////////////////////

// http://stackoverflow.com/questions/3653065/get-local-ip-address-in-node-js
// http://nodejs.org/api/os.html#os_os_networkinterfaces
var local_ips = _.chain(require('os').networkInterfaces())
	.values()
	.flatten()
	.map('address')
	.value()

_.forEach(local_ips, function(ip) {
	console.log('Listening on http://' + ip + ':' + listening_port)
});
console.log('(Ctrl+C to stop)')

app.listen(listening_port);

////////////////////////////////////
