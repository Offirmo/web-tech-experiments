#!/bin/sh
':' //# http://sambal.org/?p=1014 ; exec `dirname $0`/../../node_modules/.bin/babel-node "$0" "$@"
'use strict';

console.log('hello world !');


import x1 from './es6_module_default';

console.log('x1', x1);
