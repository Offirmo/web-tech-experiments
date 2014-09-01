#!/usr/bin/env node
'use strict';

// just run me with `node server`

console.log('Hello world !');

console.log('My pid is ', process.pid);

var express = require('express');

var listening_port = process.env.PORT || 4000;

var app = express();

var server = app.listen(listening_port, function() {
	console.log('Now listening on port ' + listening_port);
	console.log('(Ctrl+C to stop)');
});
server.on('close', function() { console.log('close event', arguments); } );
