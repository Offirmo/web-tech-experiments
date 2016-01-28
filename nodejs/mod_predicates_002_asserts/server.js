#!/usr/bin/env node
'use strict';

console.log('Hello world !');

var _ = require('lodash');


var is = require('predicates');
var createAssert = require('assert-generator');

var assertName = createAssert(is.string, 'Name must be a string');
var assertDescription = createAssert(is.string, 'Description must be a string');
var assertRequirements = createAssert(is.array, 'Requirements must be an array');

var Achievement = function(name, description, reqs) {
	assertName(name);
	assertDescription(description);
	assertRequirements(reqs);
};

new Achievement('Tom', 'Welling', []); // OK!
//new Achievement('Tom', 'Welling');
new Achievement('Tom', '', []);
