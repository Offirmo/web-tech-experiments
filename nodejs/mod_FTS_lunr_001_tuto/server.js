#!/usr/bin/env node
'use strict';

console.log('Hello world !');

let _ = require('lodash');

///////////////////////////////////////////////////////////////////////////

// https://lunrjs.com/
// https://www.new-bamboo.co.uk/blog/2013/02/26/full-text-search-in-your-browser/
// https://github.com/olivernn/lunr.js
let lunr = require('lunr');


///////////////////////////////////////////////////////////////////////////

let index = lunr(function () {
	this.field('title', {boost: 10});
	this.field('body');
	this.ref('id');
});

let documents = [{
	id: 1,
	title: 'Twelfth Night',
	body: 'If music be the food of love, play on'
}, {
	id: 2,
	title: 'Macbeth',
	body: 'When shall we three meet again, In thunder, lightning, or in rain?'
}, {
	id: 3,
	title: 'Richard III',
	body: 'Now is the winter of our discontent, Made glorious summer by this sun of York;'
}];

documents.forEach(function (document) {
	index.add(document)
});

///////////////////////////////////////////////////////////////////////////

let results = index.search('discontent');

console.log(results);
