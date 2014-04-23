#!/usr/bin/env node
'use strict';

// locus https://github.com/alidavut/locus
require('locus');


console.log('Hello world !');

var foo = 'bar';

console.log("foo is :", foo);
eval(locus);
console.log("foo is now :", foo);
