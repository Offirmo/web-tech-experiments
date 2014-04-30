#!/usr/bin/env node
'use strict';

console.log('Hello world !');

var When = require('when');
var WhenNodeFunctions = require('when/node/function');
var WhenSequence = require('when/sequence');
var WhenPipeline = require('when/pipeline');
var WhenGuard = require('when/guard');
var _ = require('underscore');

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
	// params
	this.max_inflight = 20;
	this.lines_increment = 100; // by safety, better to be big
	// current sheet state (as far as we know...)
	this.metadata = undefined;
	this.row_count = -1; // updated on metadata
	this.col_count = -1; // updated on metadata
	this.next_row = -1;
	// internal state
	this.load_options = options;
	this.load_promise = undefined; // lazy loading
	this.data_promise = undefined; // used in two funcs
	this.write_count = 0;
	this.current_write_count = 0;
	this.last_write_count = 0;
	// misc
	this.last_write_promise = When.resolve(this.write_count); // not really used for now
	this.unguarded_flush = this.flush;
	this.flush = WhenGuard(WhenGuard.n(this.max_inflight), this.unguarded_flush.bind(this));
}

GoogleSpreadsheet.prototype.load = function() {
	if(typeof this.load_promise === 'undefined') {
		console.log('* loading google doc worksheet "' + this.load_options.spreadsheetName + '/' + this.load_options.worksheetName + '"…' );
		this.load_promise = WhenNodeFunctions.call(
				EditGoogleSpreadsheet.load,
				this.load_options
		);
	}
	return this.load_promise;
};

GoogleSpreadsheet.prototype.update_metadata_ = function() {
	var this_ = this;
	return this.load().then(function(spreadsheet) {
		return WhenNodeFunctions.call(spreadsheet.metadata.bind(spreadsheet))
				.then(function(results) {
					/* { updated: Sun Mar 16 2014 22:37:41 GMT+0100 (CET),
					 title: 'Log',
					 rowCount: 100,
					 colCount: 20 } */
					this_.metadata = results[0];
					this_.row_count = this_.metadata.rowCount;
					this_.col_count = this_.metadata.colCount;
					return this_.metadata;
				});
	});
};

GoogleSpreadsheet.prototype.get_metadata = function() {
	return this.update_metadata_();
};
GoogleSpreadsheet.prototype.set_metadata = function() {
	var this_ = this;
	return this.load().then(function(spreadsheet) {
		return WhenNodeFunctions.call(spreadsheet.metadata.bind(spreadsheet),{
			title: this.metadata.title,
			rowCount: this_.row_count,
			colCount: this_.col_count
		})
		.then(function(results) {
			/* { updated: Sun Mar 16 2014 22:37:41 GMT+0100 (CET),
			 title: 'Log',
			 rowCount: 100,
			 colCount: 20 } */
			this_.metadata = results[0];
			this_.row_count = this_.metadata.rowCount;
			this_.col_count = this_.metadata.colCount;
			return this_.metadata;
		});
	});
};

GoogleSpreadsheet.prototype.get_raw_data = function() {
	if(typeof this.data_promise === 'undefined') {
		this.data_promise = this.load().then(function(spreadsheet) {
			return WhenNodeFunctions.call(spreadsheet.receive.bind(spreadsheet));
		});
		/*
		 rows : { '1': { '1': 'timestamp', '2': 'niveau' } }
		 Spreadsheet infos : { spreadsheetId: 'tbfnMX7DVCQ9Tozg1olVZCA',
		 worksheetId: 'od4',
		 worksheetTitle: 'Log',
		 worksheetUpdated: Sun Mar 16 2014 22:37:41 GMT+0100 (CET),
		 authors: [ { name: 'offirmo.net', email: 'offirmo.net@gmail.com' } ],
		 totalCells: 2,
		 totalRows: 1,
		 lastRow: 1,
		 nextRow: 2 }
		 */
		var this_ = this;
		this.data_promise.spread(function(rows, infos) {
			//console.log('get_raw_data', arguments);
			this_.next_row = infos.nextRow;
		});
	}
	return this.data_promise;
};

GoogleSpreadsheet.prototype.get_data = function() {
	return this.get_raw_data().then(function() {
		return arguments[0][0];
	});
};

GoogleSpreadsheet.prototype.get_infos = function() {
	return this.get_raw_data().then(function() {
		return arguments[0][1];
	});
};

GoogleSpreadsheet.prototype.signal_write = function() {
	this.write_count++;
};

GoogleSpreadsheet.prototype.flush = function() {
	var this_ = this;
	console.log('initiating a flush...');
	return this.load().then(function(spreadsheet) {
		console.log('sheet loaded, proceeding...');
		if(this_.write_count > this_.current_write_count) {
			console.log('sheet dirty, updating...' + ' ['+this_.last_write_count+'/'+this_.current_write_count+'/'+this_.write_count+']');
			this_.current_write_count = this_.write_count;
			var flush_write_count = this_.write_count;
			this_.last_write_promise = WhenNodeFunctions.call(spreadsheet.send.bind(spreadsheet)).then(function(){
				console.log('write finished.');
				if(flush_write_count > this_.last_write_count)
					this_.last_write_count = flush_write_count;
				console.log('current status : ' + ' ['+this_.last_write_count+'/'+this_.current_write_count+'/'+this_.write_count+']');
				return flush_write_count;
			},
			function(err) {
				// write error...
				console.log('XXX WRITE ERROR', arguments);
				// todo inspect
				// rethrow
				throw err;
			});
		}
		else {
			console.log('sheet clean, skipping flush.' + ' ['+this_.last_write_count+'/'+this_.current_write_count+'/'+this_.write_count+']');
		}
		return this_.last_write_promise;
	});
};

GoogleSpreadsheet.prototype.add_line = function(array) {
	console.log('adding a line @' + this.next_row + ' : ' + array);

	var line_data = {};
	_.forEach(array, function(cell_data, index) {
		line_data[index+1] = cell_data;
	});

	var data = {};
	data[this.next_row] = line_data;

	// now, for the sake of async, increment now (hope !)
	this.next_row++;

	var this_ = this;
	return this.load().then(function(spreadsheet) {
		console.log('[add_line] sheet loaded, proceeding...');

		var row_count_ok = When.defer();
		if(this_.next_row > this_.row_count) {
			console.log('size increase needed !');
			this_.row_count += this_.lines_increment;
			row_count_ok.resolve(this_.set_metadata());
			row_count_ok.promise.then(function() {
				console.log('size increase done.');
			});
		}
		else {
			row_count_ok.resolve(true);
		}

		return row_count_ok.promise.then(function() {
			console.log('[add_line] size ok, adding...');
			spreadsheet.add(data);
			this_.signal_write();

			console.log('[add_line] flushing...');
			var write_promise = this_.flush();

			return write_promise;
		});
	});
};

/*
var data_worksheet = new GoogleSpreadsheet({
	debug: true,
	spreadsheetName: config.get('spreadsheet:name'),
	spreadsheetId:   config.get('spreadsheet:id'),
	worksheetName:   config.get('spreadsheet:data_worksheet:name'),
	worksheetId:     config.get('spreadsheet:data_worksheet:id'),
	// authentication method 1 : Username and Password
	username:        config.get('google_user'),
	password:        config.get('google_pwd')
});*/
var log_worksheet = new GoogleSpreadsheet({
	debug: true,
	spreadsheetName: config.get('spreadsheet:name'),
	spreadsheetId:   config.get('spreadsheet:id'),
	worksheetName:   config.get('spreadsheet:log_worksheet:name'),
	worksheetId:     config.get('spreadsheet:log_worksheet:id'),
	// authentication method 1 : Username and Password
	username:        config.get('google_user'),
	password:        config.get('google_pwd')
});

/*
data_worksheet.load().then(function(worksheet) {
	console.log('data loaded !');
	return When.join(
		data_worksheet.get_metadata().then(function(metadata){
			console.log("Meta data :", metadata);
		}),
		data_worksheet.get_data().then(function(rows){
			console.log("Found rows :", rows);
		}),
		data_worksheet.get_infos().then(function(infos){
			console.log("Spreadsheet infos :", infos);
		})
	);
})
.catch(function(err) {
	console.log('Error caught\n'
			+ '* name    : ' + e.name + '\n'
			+ '* message : ' + e.message + '\n'
			+ '* stack   : ' + e.stack);
	throw err;
});*/

log_worksheet.load().then(function() {
	console.log('log loaded !');
	return When.join(
		log_worksheet.get_metadata().then(function(metadata){
			console.log("Meta data :", metadata);
		}),
		log_worksheet.get_data().then(function(rows){
			//console.log("Found rows :", rows);
		}),
		log_worksheet.get_infos().then(function(infos){
			console.log("Spreadsheet infos :", infos);
		})
	);
})
.then(function() {
	//return log_worksheet.add_line(['Hello', 'world !']);
	console.time('100-elements');
})
.then(function() {
	var last_promise;
	for(var i = 0; i < 1000; ++i) {
		console.log('adding line ' + (i+1) + '…');
		last_promise = log_worksheet.add_line(['Log', 'line', i+1]);
	}
	return last_promise;
})
.then(function() {
	console.timeEnd('100-elements');
})
.catch(function(e) {
	console.log('XXX Error caught !');
	if(e instanceof Error) {
		console.log('* name    : ' + e.name);
		console.log('* message : ' + e.message);
		console.log('* stack   : ' + e.stack);
	}
	else {
		console.log(e);
	}
});
