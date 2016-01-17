#!/usr/bin/env node
'use strict';

console.log('Hello world !');

// https://github.com/rafeca/prettyjson
var prettyjson = require('prettyjson');

var data = {
	username: 'rafeca',
	url: 'https://github.com/rafeca',
	twitter_account: 'https://twitter.com/rafeca',
	projects: ['prettyprint', 'connfu']
};

var options = {
	noColors: true
};

console.log(prettyjson.render(data, options));

console.log(prettyjson.render(data, {
	keysColor: 'rainbow',
	dashColor: 'magenta',
	stringColor: 'white'
}));
