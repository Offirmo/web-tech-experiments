#!/usr/bin/env node
'use strict';

// to be run with :
// node server.js
// NODE_ENV=production node server
// NODE_ENV=production server.js --foo bar_arg

console.log('Hello world !');

// https://github.com/flatiron/nconf

// https://github.com/flatiron/nconf/issues/39
var NconfProvider = new require('nconf').Provider;
var conf = new NconfProvider();

//
// Setup nconf to use (in-order):
//   1. Command-line arguments
//   2. Environment variables
//   3. A file located at 'path/to/config.json'
//
conf
.defaults({
	'foo': 'from_defaults',
		NODE_ENV: 'defaults'
})
.argv()
.env(['NODE_ENV'])
.file({ file: 'config.json' })
.overrides({
	'foo': 'from_overrides',
			NODE_ENV: 'override'
});

conf.set('foo', 'from_set');

///////////////////////////////

console.log('foo :', conf.get('foo'));
console.log('NODE_ENV :', conf.get('NODE_ENV'));

console.log('full : ' + JSON.stringify(conf.stores) );
