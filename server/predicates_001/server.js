#!/usr/bin/env node
'use strict';

console.log('Hello world !');

var _ = require('lodash');


var is = require('predicates');

is.string(1); // false
is.string('test'); // true

is.undefinedOr(is.string, undefined); // true
is.undefinedOr(is.string, 'timmy'); // true
is.undefinedOr(is.string)(undefined); // true
is.undefinedOr(is.string)('timmy'); // true

var isPerson = is.structure({
	name: is.string,
	surname: is.undefinedOr(is.string),
	age: is.number
});

console.log( isPerson({name: 'Tom', age: 10}) ); // true
console.log( isPerson({surname: 'Welling', age: 100}) ); // false, lack of name property

