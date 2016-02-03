#!/usr/bin/env node
'use strict';

console.log('Hello world !');

let _ = require('lodash');

///////////////////////////////////////////////////////////////////////////

// http://lunrjs.com/
// https://www.new-bamboo.co.uk/blog/2013/02/26/full-text-search-in-your-browser/
// https://github.com/olivernn/lunr.js
let lunr = require('lunr');


///////////////////////////////////////////////////////////////////////////

let index = lunr(function () {
	this.field('description', {boost: 10});
	this.field('author');
	this.field('place');
	this.ref('id');
});

let documents = [
	{
		// Obama Merkel - 1
		id: 1,
		description: 'The sleepy village of Staro Zhelezare in central Bulgaria is harnessing the power of celebrities, hoping for an economic revival through art. Outdoor murals in the village feature local people alongside celebrities on their homes. Homeowners are depicted with personalities such as Pope Francis, Queen Elizabeth II, Angela Merkel, Indira Gandhi, Margaret Thatcher, Barack Obama and Fidel Castro.',
		author: 'Valentina Petrova',
		place: 'Staro Zhelezare, Bulgaria',
		date: 'Jan. 27, 2016'
	},
	{
		// Obama + Merkel - 2
		id: 2,
		description: 'This photo shows US President Barack Obama (L) and German Chancellor Angela Merkel gesturing during a press conference at the Chancellery in Berlin. German Chancellor Angela Merkel regretted during her traditional summer interview on ZDF TV channel on July 12, 2014 the deterioration of the trust between the USA and Germany, amid a row with the US over spying...',
		author: 'JOHANNES EISELE',
		place: 'Berlin, Germany',
		date: 'June 19, 2013'
	},
	{
		// Obama only
		id: 3,
		description: 'First lady Michelle Obama speaks during a panel entitled "Media with Purpose" at the American Magazine Media 360...',
		author: 'Seth Wenig',
		place: 'New York',
		date: 'Feb. 2, 2016'
	},
	{
		// Merkel only
		id: 4,
		description: 'German Chancellor Angela Merkel gives a speech during a regional meeting of her Christian Democratic Union (CDU) party on January 30, 2016 in Neubrandenburg, northeastern Germany. Merkel said she expected most of the refugees from Syria and Iraq to return home once peace has returned to their countries...',
		author: 'Bernd Settnik',
		place: 'Neubrandenburg, Germany',
		date: 'January 30, 2016'
	},
	{
		// François Hollande
		id: 4,
		description: 'French President Francois Hollande leaves the Elysee Palace after the council of ministers...',
		author: 'STEPHANE DE SAKUTIN',
		place: 'Paris, France',
		date: 'February 3, 2016 in Paris'
	},
	{
		// François Bayrou
		id: 4,
		description: 'President of the MoDem centrist party Francois Bayrou delivers a speech during the opening of the party\'s summer congress on  in . AFP PHOTO / ',
		author: 'JEAN-SEBASTIEN EVRARD',
		place: 'Guidel, France',
		date: 'September 25, 2015'
	},
	{
		// François Bayrou in Hollande
		id: 4,
		description: 'President of the MoDem centrist party Francois Bayrou HAS VISITED Hollande-Septentrionale',
		author: 'John Smith',
		place: 'Amsterdam, Pays-Bas',
		date: 'July 11, 2015'
	},
	{
		// François in author
		id: 4,
		description: 'Hello world',
		author: 'Francois Berube',
		place: 'Angers, France',
		date: 'September 25, 2015'
	},
];

documents.forEach(function (document) {
	index.add(document)
});

///////////////////////////////////////////////////////////////////////////

let results_Obama_Merkel = index.search('obama merkel');
let results_Obama = index.search('obama');
let results_Merkel = index.search('merkel');
let results_Francois_Hollande = index.search('François Hollande');

console.log('results_Obama', results_Obama);
console.log('results_Merkel', results_Merkel);

// should only return results with BOTH words (AND by default)
console.log('results_Obama_Merkel', results_Obama_Merkel);

// should put closer results at the top
console.log('results_Francois_Hollande', results_Francois_Hollande);



////
/* Uses cases

"Base"
- stemming
  Ex. Should work with "François" (ç) and various accents
- stop words
  Ex. "tableau de monet" should not match "de"
- several words = AND by default
  Ex. "Catherine Deneuve" should not give results about Catherine Creig
  Ex. "Obama Merkel" should not give results with only Obama or Merkel
- several words = closer gives better score
  Ex. "François Hollande" should yield lower results for "François Bayrou en Hollande"

"Autocomplete"
  ...

"Google style"
- several words = can return results with a single word, but with lower score (
- Catherine => Katherine McNamara
 */
