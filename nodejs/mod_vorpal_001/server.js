#!/bin/sh
':' //# http://sambal.org/?p=1014 ; exec /usr/bin/env node --harmony_destructuring "$0" "$@"
'use strict';

console.log('Hello world !');

////////////////////////////////////////////////////////////

const _ = require('lodash');

// https://github.com/dthree/vorpal
var vorpal = require('vorpal')();

vorpal
	.command('foo', 'Outputs "bar".')
	.action(function(args, callback) {
		this.log('bar');
		callback();
	});

vorpal
	.delimiter('myapp$')
	.show();
