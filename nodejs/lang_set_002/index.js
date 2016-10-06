#!/usr/bin/env node
'use strict';

console.log('Hello world !');

let set1 = new Set(['red', 'blue'])

let set = new Set([...set1, 'green', 'blue'])

console.log('size', set.size)
console.log('values', set.values())
console.log('keys', set.keys())
console.log('entries', set.entries())
