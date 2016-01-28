#!/usr/bin/env node
'use strict';

console.log('Hello world !');

var Spreadsheet = require('edit-google-spreadsheet');

Spreadsheet.load({
	debug: true,
	spreadsheetName: 'DatabaseTest01',
	worksheetName: 'data',
	// Choose from 1 of the 3 authentication methods:
	//    1. Username and Password
	username: 'offirmo.net@gmail.com',
	password: 'secret !!!'
	// OR 2. OAuth
	//oauth : {
	//	email: 'my-name@google.email.com',
	//	keyFile: 'my-private-key.pem'
	//},
	// OR 3. Token
	//accessToken : {
	//	type: 'Bearer',
	//	token: 'xyz'
	//}
}, function sheetReady(err, spreadsheet) {
	console.log('ready ?');
	if(err) throw err;

	spreadsheet.receive(function(err, rows, info) {
		if(err) throw err;
		console.log("Found rows:", rows);
		// Found rows: { '3': { '5': 'hello!' } }
	});

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

	spreadsheet.metadata(function(err, metadata){
		if(err) throw err;
		console.log(metadata);
		// { title: 'Sheet3', rowCount: '100', colCount: '20', updated: [Date] }
	});

});
