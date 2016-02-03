#!/usr/bin/env node
'use strict';

console.log('Hello world !');

let _ = require('lodash');

///////////////////////////////////////////////////////////////////////////

// http://reyesr.github.io/fullproof/
// http://kornr.net/prez/paris.js22/#/
// https://github.com/reyesr/fullproof
// http://reyesr.github.io/fullproof/tutorial.html
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
