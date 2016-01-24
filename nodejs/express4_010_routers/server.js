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
var sub_app = require('./sub-app');


/////////////////////////////////////////////

var app = express();

app.get('/', function(req, res) {
	res.send('hello from app !');
});

app.use('/router', sub_router);
app.use('/meta', meta_router);
app.use('/app', sub_app);

/////////////////////////////////////////////

app.listen(LISTENING_PORT);

/////////////////////////////////////////////

_.forEach(local_ips, function(ip) {
	console.log('Listening on http://' + ip + ':' + LISTENING_PORT);
});
console.log('(Ctrl+C to stop)');
