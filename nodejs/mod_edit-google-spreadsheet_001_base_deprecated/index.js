#!/usr/bin/env node
'use strict';

console.log('Hello world !');

var Spreadsheet = require('edit-google-spreadsheet');

Spreadsheet.load({
	debug: true,
	spreadsheetName: 'EF - lib watch',
	worksheetName: 'data',
	// Choose from 1 of the 3 authentication methods:
	//    1. Username and Password -> DEPRECATED
	// OR 2. OAuth
	// OR 3. OAuth2 (See get_oauth2_permissions.js)
	"oauth2": require('../google_oauth2.json')
	// OR 4. Static Token
	// accessToken : {
	//	type: 'Bearer',
	//	token: 'xyz'
	//}
	// OR 5. Dynamic Token
}, function sheetReady(err, spreadsheet) {
	console.log('ready ?');
	if(err) throw err;

	// read data
	spreadsheet.receive(function(err, rows, info) {
		if(err) throw err;
		console.log("Found rows:", rows);
		// Found rows: { '3': { '5': 'hello!' } }
	});
/*
	spreadsheet.add({ 3: { 5: "hello!" } });
	spreadsheet.add({
		3: {
			4: { name: "a", val: 42 }, //'42' though tagged as "a"
			5: { name: "b", val: 21 }, //'21' though tagged as "b"
			6: "={{ a }}+{{ b }}"      //forumla adding row3,col4 with row3,col5 => '=D3+E3'
		}
	});

	spreadsheet.send(function(err) {
		if(err) throw err;
		console.log("Updated Cell at row 3, column 5 to 'hello!'");
	});
*/

	// get metadata
	spreadsheet.metadata(function(err, metadata){
		if(err) throw err;
		console.log(metadata);
		// { title: 'Sheet3', rowCount: '100', colCount: '20', updated: [Date] }
	});

});
