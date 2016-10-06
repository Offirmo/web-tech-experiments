#!/usr/bin/env node
'use strict';

console.log('Hello world !');

let set = new Set()

set.add('red')
set.add('blue')
set.has('red')

console.log('size', set.size)
console.log('values', set.values())
console.log('keys', set.keys())
console.log('entries', set.entries())
