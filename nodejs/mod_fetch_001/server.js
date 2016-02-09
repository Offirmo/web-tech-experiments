#!/usr/bin/env node
'use strict';

console.log('Hello world !');

////////////////////////////////////////////////////////////

// https://github.com/bitinn/node-fetch
const fetch = require('node-fetch');


////////////////////////////////////////////////////////////

fetch('https://api.github.com/users/github')
.then(function(res) {
	return res.json();
})
.then(function(json) {
	console.log(json);
});
