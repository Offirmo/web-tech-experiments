#!/usr/bin/env node
'use strict';

// to be run with :
// node server.js
// NODE_ENV=production node server
// NODE_ENV=production node server --foo bar

console.log('Hello world !');

// https://github.com/flatiron/nconf
var nconf = require('nconf');

//
// Setup nconf to use (in-order):
//   1. Command-line arguments
//   2. Environment variables
//   3. A file located at 'path/to/config.json'
//
nconf.argv()
		.env()
		.file({ file: 'config.json' });

//
// Set a few variables on `nconf`.
//
nconf.set('database:host', '127.0.0.1');
nconf.set('database:port', 5984);

//
// Get the entire database object from nconf. This will output
// { host: '127.0.0.1', port: 5984 }
//
console.log('foo : ' + nconf.get('foo'));
console.log('NODE_ENV : ' + nconf.get('NODE_ENV'));
console.log('database : ' + JSON.stringify(nconf.get('database')) );
