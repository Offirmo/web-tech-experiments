#!/bin/sh
':' //# http://sambal.org/?p=1014 ; exec `dirname $0`/../../node_modules/.bin/babel-node "$0" "$@"
'use strict';

console.log('hello world !');


const x1 = require('./es6_module_default');
const x2 = require('./es6_module_named');

console.log('x1', x1); // ~
console.log('x2', x2); // ~
