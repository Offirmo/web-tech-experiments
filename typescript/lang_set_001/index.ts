#!/bin/sh
':' //# http://sambal.org/?p=1014 ; exec `dirname $0`/../../node_modules/.bin/ts-node "$0" "$@"
'use strict';

console.log('Hello, typescript world !')

let set1 = new Set(['red', 'blue'])

let set = new Set([...set1, 'green', 'blue'])

console.log('size', set.size)
console.log('values', set.values())
console.log('keys', set.keys())
console.log('entries', set.entries())
