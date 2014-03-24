if (typeof define !== 'function') { var define = require('amdefine')(module); }

define(
[
	'lodash',
	'winston',
	'prettyjson',
	'colors'
],
function(_, winston, prettyjson) {
  'use strict';

	var is_Error_StringifyReady = false;
	(function ensure_Error_StringifyReady(){
		if(! is_Error_StringifyReady) {
			console.log('enhancing Error...');
			// http://massalabs.com/dev/2013/10/17/handling-errors-in-nodejs.html
			var config = {
				configurable: true,
				value: function() {
					var alt = {};
					var storeKey = function(key) {
						alt[key] = this[key];
						if((typeof this[key] === 'string') && this[key].length === 0) {
							alt[key] = '(empty string)';
						}
					};
					Object.getOwnPropertyNames(this).forEach(storeKey, this);
					['name', 'message', 'fileName', 'lineNumber'].forEach(storeKey, this);
					return alt;
				}
			};
			Object.defineProperty(Error.prototype, 'toJSON', config);
			is_Error_StringifyReady = true;
		}
	})();

	var prettyjson_error_render_config = {
		emptyArrayMsg: '(empty)', // Rendered message on empty strings
		keysColor: 'red',
		dashColor: 'white',
		stringColor: 'yellow'
	};
	function log_exception(e) {
		console.error('XXX Exception caught XXX'.red);
		var fullError = JSON.parse(JSON.stringify(e));
		var message = prettyjson.render(fullError, prettyjson_error_render_config);
		console.error(message);
	}

	var is_uncaughtException_handler_set = false;
	(function ensure_uncaughtException_handler_set(){
		if(! is_uncaughtException_handler_set) {
			console.log('installing uncaught handler...');
			process.on('uncaughtException', function(err){
				// log the error
				log_exception(err);
				process.exit(1);
			});
			is_uncaughtException_handler_set = true;
		}
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

			// internals, just in case
			logger_: logger
		};
	}


	return create_logger;
});
