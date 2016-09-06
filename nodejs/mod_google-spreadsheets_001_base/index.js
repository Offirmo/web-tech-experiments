#!/usr/bin/env node
'use strict';

const GoogleSpreadsheets = require('google-spreadsheets')
const prettyjson = require('prettyjson')


GoogleSpreadsheets({
	key: '1hBMZlf6Yy84CSCUUU6ZIdpCJ005YrtA68-k8Tc99vyg'
}, function(err, spreadsheet) {
	spreadsheet.worksheets[0].cells({
		range: 'R1C1:R5C5'
	}, function(err, cells) {
		// Cells will contain a 2 dimensional array with all cell data in the
		// range requested.
		if (err) return console.error('Request failed', err)
		console.log(prettyjson.render(cells))
	});
});

