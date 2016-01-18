#!/usr/bin/env node
'use strict';

// just run me with `node server`

console.log('Hello world !');

https://github.com/metaraine/shackles
var shackles = require('shackles');


var shackled_duck = {
	// linking words
	a: function a(out) {
		return out;
	},
	string: function is_a_string(out) {

	}
};


var is = shackles(shackled_duck);
/*
var result = is('foo').a().string();
console.log(result);

console.log(is('foo'));
console.log(is('foo').a);

*/

var chai = require('chai');
var expect = chai.expect;

expect('foo').to.be.a('string');
expect('foo').to.be.a('number');
