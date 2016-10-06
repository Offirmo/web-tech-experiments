#!/bin/sh
':' //# http://sambal.org/?p=1014 ; exec `dirname $0`/../../node_modules/.bin/ts-node "$0" "$@"
'use strict';

console.log('Hello, typescript world !')

let s = Symbol('foo')

console.log('raw', s)
console.log('tostring', s.toString())
console.log('String()', String(s))
