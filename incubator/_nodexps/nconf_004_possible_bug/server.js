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
	'NODE_ENV': 'development'
})
.argv()
.env(['NODE_ENV'])
.file({ file: 'config.json' })
.overrides({
});

conf.file('envFile', 'config.' + conf.get('NODE_ENV') + '.json');

var res = conf.set('NODE_ENV', 'toto');
console.log(res);
console.log(conf.get('NODE_ENV'));
