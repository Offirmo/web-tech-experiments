#!/usr/bin/env node
'use strict';

console.log('Hello world !');

const fetch = require('isomorphic-fetch') // isomorphic = same API for node and browser = less to learn
const readJsonFile = require('read-json') // there is also plenty of small, expressive libs


// https://github.com/sindresorhus/latest-version
// https://github.com/sindresorhus/package-json

function getCurrentVersion() {
	return new Promise((resolve, reject) => {
		readJsonFile('./package.json', function (error, manifest) {
			if (err) return reject(err)
			resolve(manifest.version)
		})
	})
}

function getLatestVersion() {
	const package_name = 'the-npm-rpg'
	const package_url = 'https://registry.npmjs.org/' + encodeURIComponent(package_name).replace(/^%40/, '@')

	return fetch(package_url)
		.then(response => {
			if (response.status >= 400)
				throw new Error('Bad response from server')
			return response.json()
		})
		.then(module_details => module_details['dist-tags'].latest)
}

Promise.all([
		getCurrentVersion(),
		getLatestVersion(),
	])
	.then(([current, latest]) => {
		console.log({current, latest})
	})
	.catch(console.error)

