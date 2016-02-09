#!/usr/bin/env node
'use strict';

console.log('Hello world !');

////////////////////////////////////////////////////////////

// https://github.com/maxlath/wikidata-sdk
const wdk = require('wikidata-sdk');


////////////////////////////////////////////////////////////

let url = wdk.searchEntities({
	search: 'Ingmar Bergman',
	language: 'fr',
	format: 'json',
	limit: 10
});

console.log(url);
