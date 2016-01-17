#!/usr/bin/env node
'use strict';

console.log('Hello world !');

var fermata = require('fermata');

var site = fermata.json('https://google.fr');

site.api.search.images({
	operator: 'AND',
	'sorts[0][field]': 'created_at',
	'sorts[0][direction]': 'DESC',
	rows: 40,
	start: 0,
	q: 'obama'
}).get(function (err, data, headers) {
	if (err)
		console.error(err, headers);
	else
		console.log(data, headers);
});
