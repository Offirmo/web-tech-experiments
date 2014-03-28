if (typeof define !== 'function') { var define = require('amdefine')(module); }

// http://massalabs.com/dev/2013/10/17/handling-errors-in-nodejs.html

// TODO https://github.com/adamschwartz/log

define(
[
	'path',
	'lodash',
	'winston',
	'prettyjson',
   'json-stringify-safe',
	'longjohn',
	'colors'
],
function(node_path, _, winston, prettyjson, safeJsonStringify) {
  'use strict';

	//var longjohn_activated = true;

	// dedicated function to log an exception in the most readable way
	var exception_key_align = 20;
	function aligned_key(key) {
		if(key.length < exception_key_align)
			key = (key + '                    ').substr(0,exception_key_align);
		return key;
	}
	function log_exception_to_console(e, subcount) {
		try {
			// safely inside a try/catch, now we can go fancy

			// it happens that exceptions embed other exceptions
			// we handle that and indent
			subcount = subcount || 1;
			var indent = (new Array(subcount)).join('    ');

			console.error(indent + ('XXXXXXX Exception ' +
			  (subcount > 1 ? ('(' + subcount + ') ') : '') +
			  'begin XXXXXXX').red.inverse.white.bold);

			// js Error objects behave strangely
			// let's make a sane copy
			var sane_exception_data = {};
			var store_exception_key = function(key) {
				if(typeof e[key] !== 'undefined') {
					sane_exception_data[key] = e[key];
					if((typeof e[key] === 'string') && e[key].length === 0) {
						sane_exception_data[key] = '(empty string)';
					}
				}
			};
			// safely force import common keys, even if inherited
			['name', 'message', 'fileName', 'lineNumber'].forEach(store_exception_key, this);
			// then all immediate keys
			Object.getOwnPropertyNames(e).forEach(store_exception_key, this);

			// union put the keys we want first
			var ordered_keys = _.union(['name', 'message', 'fileName', 'lineNumber', 'stack'], _.keys(sane_exception_data));
			ordered_keys.forEach(function(key) {
				if(key === 'stack') {
					// skip it for now, see below
				}
				else if(key === '__cached_trace__' || key === '__previous__') {
					// longjohn stuff, skip it
				}
				else {
					var value = e[key];
					if(value instanceof Error) {
						// recursion
						log_exception_to_console(value, subcount+1);
					}
					else if(_.isObject(value)) {
						console.error(indent + aligned_key(key).red.bold + ' : ' + safeJsonStringify(e[key], null, 4).yellow);
					}
					else {
						console.error(indent + aligned_key(key).red.bold + ' : ' + ('' + value).yellow);
					}
				}
			});
			// and eventually, the stack trace
			log_exception_stack_to_console(indent, e);
		}
		catch(e2) {
			// safety first, we console.log the exception to be absolutely sure it's shown
			console.error('XXX Exception caught XXX', e);
			console.error('and then we thrown another one while doing fancy display :', e2);
		}
		console.error(indent + ('XXXXXXX Exception ' +
		  (subcount ? ('(' + subcount + ') ') : '') +
		  'end XXXXXXX').red.inverse.white.bold);
	}
	function log_exception_stack_to_console(indent, e) {
		var line_splitted_stack = e['stack'].match(/[^\r\n]+/g);
		var cwd = process.cwd();
		console.error(indent + 'stack trace'.red.bold + (' (from '+ cwd.bold + ')').yellow);
		line_splitted_stack.forEach(function(line, i) {
			if(i) // skip useless first line
				console.error(indent + format_stack_line(line, cwd));
		});
	}
	function format_stack_line(line, cwd) {
		// we want to display interesting lines in strong
		var is_interesting = false;
		var has_file_reference = false;
		if(line.indexOf('(/') !== -1) {
			// correspond to a real file
			has_file_reference = true;
			if(line.indexOf('node_modules') === -1) {
				is_interesting = true;
			}
		}
		if(is_interesting) {
			line = line.yellow;
			if(has_file_reference) {
				// try to simplify the file name
				var path_start = line.indexOf('(/') + 1;
				var path_end = line.indexOf(':', path_start);
				var absolute_path = line.slice(path_start, path_end);
				var simpler_path = node_path.relative(cwd, absolute_path);
				line = line.substr(0, path_start) + simpler_path.bold + line.substr(path_end);
			}
			return line;
		}
		return line.grey;
	}

	(function install_uncaughtException_handler(){
		//console.log('installing uncaught handler...');
		process.on('uncaughtException', function(err){
			// log the error
			console.error('XXXXXXX Uncaught exception XXXXXXX'.red.inverse.white.bold);
			log_exception_to_console(err);
			console.error('XXXXXXX Program will now exit... XXXXXXX'.red.inverse.white.bold);
			process.exit(1);
		});
	})();

	var console_style_custom_winston_levels = {
		levels: {
			log1: 0,
			info: 1,
			warn: 2,
			error: 3
		},
		colors: {
			log1: 'blue',
			info: 'green',
			warn: 'yellow',
			error: 'red'
		}
	};
	winston.addColors(console_style_custom_winston_levels.colors);

	function create_logger(label) {

		var logger = new (winston.Logger)({
			levels: console_style_custom_winston_levels.levels,
			transports: [
				new (winston.transports.Console)({
					level: 'silly', // Level of messages that this transport should log (default 'info').
					silent: false,  // Boolean flag indicating whether to suppress output (default false).
					colorize: true, // flag indicating if we should colorize output (default false).
					timestamp: true // flag indicating if we should prepend output with timestamps (default false).
					// If function is specified, its return value will be used instead of timestamps.
				})
			]
		});

		// ease a lot of things
		_.bindAll(logger);

		return {

			// console re-implementation
			log:   _.partial(logger.log, 'debug'),
			info:  _.partial(logger.log, 'info' ),
			warn:  _.partial(logger.log, 'warn' ),
			error: _.partial(logger.log, 'error'),
			dir: function() {

			},
			trace: function() {

			},

			// console untouched
			time: console.time,
			timeEnd: console.timeEnd,
			assert: console.assert,

			// additions
			//logger.log('silly',   'Log at silly level');
			//logger.log('verbose', 'Log at verbose level');
			exception: log_exception_to_console,

			// internals, just in case
			logger_: logger
		};
	}


	return create_logger;
});
