#!/usr/bin/env node
'use strict';

console.log('Hello world !');

////////////////////////////////////////////////////////////

// https://github.com/maxlath/wikidata-sdk
const wdk = require('wikidata-sdk');

const fetch = require('node-fetch');


////////////////////////////////////////////////////////////


let ids = Array.from(Array(30).keys()).map(x => 'P' + (x + 1));

var url = wdk.getEntities({
	ids,
	languages: ['en'], // returns all languages if not specified
	properties: ['labels'], // returns all data if not specified
	format: 'json'
});

console.log(url);

fetch(url)
.then(function(res) {
	return res.json();
})
.then(function(json) {
	console.log(json);
});


