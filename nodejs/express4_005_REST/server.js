#!/usr/bin/env node
'use strict';

TODO

console.log('Hello world !');

var _ = require('lodash');

var listening_port = process.env.PORT || 3000;

// https://stackoverflow.com/questions/3653065/get-local-ip-address-in-node-js
// https://nodejs.org/api/os.html#os_os_networkinterfaces
var local_ips = _.chain(require('os').networkInterfaces())
	.flatten()
	.filter(function(val){
		return (val.family === 'IPv4' && val.internal === false);
	})
	.pluck('address')
	.value();



// https://expressjs.com/4x/api.html

var express = require('express');
// + interesting modules
var path = require('path');
var favicon = require('serve-favicon'); // https://github.com/expressjs/serve-favicon
var logger = require('morgan'); // https://github.com/expressjs/morgan
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser'); // https://github.com/expressjs/body-parser


var app = express();
app.set('view engine', 'dust');

app.use(logger('dev'));
/*
morgan() // default
morgan('short')
morgan('tiny')
morgan({ format: 'dev', immediate: true })
morgan(':method :url - :referrer')
morgan(':req[content-type] -> :res[content-type]')
morgan(function(tokens, req, res){ return 'some format string' })
morgan({ format: 'dev', skip: function(req, res){ return res.statusCode === 304; }})
*/

app.use(favicon('../../client/misc/favicon_16x16.png'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// parse application/vnd.api+json as json
app.use(bodyParser.json({ type: 'application/vnd.api+json' }))


app.get('/', function(req, res){
	res.send('hello world');
});



app.listen(listening_port, function() {
	_.forEach(local_ips, function(ip) {
		console.log('Listening on https://' + ip + ':' + listening_port);
	});
	console.log('(Ctrl+C to stop)');
});
