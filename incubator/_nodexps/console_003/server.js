#!/usr/bin/env node
'use strict';

//var log = require('../logging');

console.log('Hello world !');

var prettyjson = require('prettyjson');
var config = {
	configurable: true,
	value: function() {
		var alt = {};
		var storeKey = function(key) {
			alt[key] = this[key];
		};
		Object.getOwnPropertyNames(this).forEach(storeKey, this);
		return alt;
	}
};
Object.defineProperty(Error.prototype, 'toJSON', config);



var error = new Error('something broke');
error.inner = new Error('some inner thing broke');
error.code = '500c';
error.severity = 'high';


var fullError = JSON.parse(JSON.stringify(error));
var message = prettyjson.render(fullError);
console.error(message);


console.log(error);
