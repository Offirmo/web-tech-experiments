#!/usr/bin/env node
'use strict';

console.log('Hello world !');

var obj = {

};

Object.defineProperty(obj, 'prop',
{
	get: function () {
		console.log('get');
		return 42;
	},

	set: function () {
		console.log('set', arguments);
		return 42;
	}
});

console.log('acess :', obj.prop);

obj.prop = 58;
