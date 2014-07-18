#!/usr/bin/env node
'use strict';

// to be run with :
/*
                            node server
NODE_ENV=production         node server
NODE_ENV=production         node server --foo bar
NODE_ENV=production foo=baz node server
NODE_ENV=production foo=baz node server --foo bar
*/

console.log('Hello world !');
console.log('REM defaults -> argv -> env -> file -> set()');
console.log('--------------------');


// https://github.com/flatiron/nconf
var nconf = require('nconf');

nconf.set('database:host', '127.0.0.1manualbefore');

//
// Setup nconf to use (in-order):
//   1. Command-line arguments
//   2. Environment variables
//   3. A file located at 'path/to/config.json'
//
nconf
	.defaults({
		'database:port': 5983
	})
	.argv()
	.env()
	.file({ file: 'config.json' });

//
// Set a few variables on `nconf`.
//
nconf.set('database:host', '127.0.0.1manualafter');
nconf.set('database:port', 5985);

//
// Get the entire database object from nconf. This will output
// { host: '127.0.0.1', port: 5984 }
//
console.log('foo      : ' + nconf.get('foo'));
console.log('NODE_ENV : ' + nconf.get('NODE_ENV'));
console.log('database : ' + JSON.stringify(nconf.get('database')) );
console.log('--------------------');
