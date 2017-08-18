#!/bin/sh
':' //# http://sambal.org/?p=1014 ; exec `dirname $0`/../../node_modules/.bin/babel-node "$0" "$@"
'use strict';

console.log('hello world !');


import x1 from './es6_module_default';
import x2 from './es6_module_named';
import {data as x3} from './es6_module_named';

console.log('x1', x1); // OK
console.log('x2', x2); // undefined
console.log('x3', x3); // OK
