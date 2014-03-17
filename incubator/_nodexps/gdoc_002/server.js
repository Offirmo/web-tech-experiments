#!/usr/bin/env node
'use strict';

console.log('Hello world !');


///////
var config = new (require('nconf').Provider)();
config.argv();
config.env(['NODE_ENV', 'google_pwd']);
config.file({ file: 'config.json' });
config.defaults({
	NODE_ENV: 'Development',
	google_pwd: '[please safely set your password as an ENV VAR]'
});
//console.log('* config : ' + JSON.stringify(config.stores, null, '\t') );


///////
var Spreadsheet = require('edit-google-spreadsheet');

console.log('* loading google doc spreadsheet ' + config.get('spreadsheet_name') + '.' + config.get('worksheet_name') + '...' );
Spreadsheet.load({
	debug: true,
	spreadsheetName: config.get('spreadsheet_name'),
	spreadsheetId:   config.get('optimisation:spreadsheet_id'),
	worksheetName:   config.get('worksheet_name'),
	worksheetId:     config.get('optimisation:worksheet_id'),
	// authentication method 1 : Username and Password
	username:        config.get('google_user'),
	password:        config.get('google_pwd')
}, function sheetLoaded(err, spreadsheet) {
	console.log('ready ?');
	if(err) throw err;

	spreadsheet.receive(function(err, rows, info) {
		if(err) throw err;
		console.log("Found rows :", rows);
		// Found rows: { '3': { '5': 'hello!' } }
		console.log("Spreadsheet data :", info);
	});

	spreadsheet.metadata(function(err, metadata){
		if(err) throw err;
		console.log("Meta data :", metadata);
		// { title: 'Sheet3', rowCount: '100', colCount: '20', updated: [Date] }
	});
});
