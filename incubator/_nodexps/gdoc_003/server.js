#!/usr/bin/env node
'use strict';

console.log('Hello world !');

var When = require('when');
var WhenNodeFunctions = require('when/node/function');
var WhenSequence = require('when/sequence');
var WhenPipeline = require('when/pipeline');

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
var EditGoogleSpreadsheet = require('edit-google-spreadsheet');

function GoogleSpreadsheet(options) {
	this.load_options = options;
}
GoogleSpreadsheet.prototype.load = function() {
	if(typeof this.load_promise === 'undefined') {
		console.log('starting load...');
		this.load_promise = WhenNodeFunctions.call(
				EditGoogleSpreadsheet.load,
				this.load_options
		);
	}
	return this.load_promise;
};
GoogleSpreadsheet.prototype.get_metadata = function() {
	return this.load().then(function(spreadsheet) {
		return  WhenNodeFunctions.call(spreadsheet.metadata.bind(spreadsheet));
	});
};
GoogleSpreadsheet.prototype.get_data = function() {
	return this.load().then(function(spreadsheet) {
		return  WhenNodeFunctions.call(spreadsheet.receive.bind(spreadsheet));
	});
};


console.log('* loading google doc spreadsheet ' + config.get('spreadsheet_name') + '.' + config.get('worksheet_name') + '...' );
var worksheet = new GoogleSpreadsheet({
	debug: true,
	spreadsheetName: config.get('spreadsheet_name'),
	spreadsheetId:   config.get('optimisation:spreadsheet_id'),
	worksheetName:   config.get('worksheet_name'),
	worksheetId:     config.get('optimisation:worksheet_id'),
	// authentication method 1 : Username and Password
	username:        config.get('google_user'),
	password:        config.get('google_pwd')
});

worksheet.load().then(function() {
	console.log('loaded !');
	return When.join(
		worksheet.get_metadata().spread(function(metadata){
			console.log("Meta data :", metadata);
		}),
		worksheet.get_data().spread(function(rows, info){
			console.log("Found rows :", rows);
			console.log("Spreadsheet data :", info);
		})
	);
})
.then(function() {

})
.catch(function(err) {
	console.log('Error caught\n'
			+ '* name    : ' + e.name + '\n'
			+ '* message : ' + e.message + '\n'
			+ '* stack   : ' + e.stack);
	throw err;
});





/*
Spreadsheet.load(, function sheetLoaded(err, spreadsheet) {
	console.log('ready ?');
	if(err) throw err;

	spreadsheet.receive(function(err, rows, info) {
		if(err) throw err;
		console.log("Found rows :", rows);
		// Found rows: { '3': { '5': 'hello!' } }
	});

	get_spreadsheet_metadata(spreadsheet).then(function(metadata) {
		console.log("Meta data :", metadata);
		// { title: 'Sheet3', rowCount: '100', colCount: '20', updated: [Date] }
	},
	function(err) {
		throw err;
	});

	spreadsheet.receive( function( err , rows , info ){
		if(err) throw err;
		console.log("Full spreadsheet :", info);

	});

});
*/
