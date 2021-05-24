#!/bin/sh
':' //# https://sambal.org/?p=1014 ; exec /usr/bin/env node --harmony_destructuring "$0" "$@"
'use strict';

console.log('Hello world !');

////////////////////////////////////////////////////////////

const _ = require('lodash');
var faker = require('faker');
var chalk = require('chalk');

// https://github.com/dylang/observatory
const observatoryLib = require('observatory');

////////////////////////////////////////////////////////////

var observatory = observatoryLib.settings({
	width: 55,
	prefix: chalk.cyan('[Bangja] ')
});


function delay(ms) {
	return new Promise((resolve, reject) => {
		setTimeout(resolve, faker.random.number(ms || 2000));
	});
}

function createRandomTask() {

	var task = observatory
		.add(faker.company.bs());
	var percent = 0;

	function download () {
		percent =  faker.random.number(100 - percent) + percent;

		task.status('downloading')
			.details(percent + '%');
		if (percent > 98) {
			return delay(100).then(parse);
		}

		return delay(500).then(download);
	}

	function parse() {
		task.status('parsing')
			.details('');

		return delay(1500)
			.then(done);
	}

	function done() {
		task.done()
			.details('https://github.com/' + faker.internet.domainWord() + '/' + faker.company.bsNoun());
	}

	delay()
		.then(download, function(err){
			console.log('ERR', err);
		});
}

function randomlyAddMore() {

	createRandomTask();

	delay()
		.then(function(){
			randomlyAddMore();
		});
}

console.log('  ⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽');
console.log('    Running Random Fake observatory Commands  ');
console.log('  ⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺');
randomlyAddMore();
