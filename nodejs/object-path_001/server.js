#!/usr/bin/env node
'use strict';

console.log('Hello world !');

var object_path = require('object-path');

var data = {
	foo: {
		bar: 42,
		toto: false
	}
};

console.log(object_path.get(data, 'foo.bar'));
console.log(object_path.get(data, 'foo.baz'));
console.log(object_path.get(data, 'foo.toto'));
console.log(object_path.get(data, 'foo.toto', true));
