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



/*
const Property_instance_of = 'P31'; // https://www.wikidata.org/wiki/Property:P31


var ids = 'Q571'; // could also be several ids as an array: ['Q1', 'Q5', 'Q571']
var languages = ['en', 'fr']; // returns all languages if not specified
var properties = undefined; // ['info', 'claims']; // returns all data if not specified

var url = wdk.getEntities(ids, languages, properties);
*/
