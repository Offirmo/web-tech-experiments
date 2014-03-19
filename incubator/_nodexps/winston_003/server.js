#!/usr/bin/env node
'use strict';

console.log('Hello world !');

// https://github.com/flatiron/winston

var winston = require('winston');

// adjust winston default logger
winston.remove(winston.transports.Console);
winston.add(winston.transports.Console, {
	level: 'silly', // Level of messages that this transport should log (default 'info').
	colorize: true // flag indicating if we should colorize output (default false).
});


var logger = new (winston.Logger)({
	transports: [
		new (winston.transports.Console)({
			level: 'silly', // Level of messages that this transport should log (default 'info').
			silent: false,  // Boolean flag indicating whether to suppress output (default false).
			colorize: true, // flag indicating if we should colorize output (default false).
			timestamp: true // flag indicating if we should prepend output with timestamps (default false).
			// If function is specified, its return value will be used instead of timestamps.
		}),
		new (winston.transports.File)({ filename: 'winston.log' })
	]
});


logger.log('silly',   'Log at silly level');
logger.log('debug',   'Log at debug level');
logger.log('verbose', 'Log at verbose level');
logger.log('info',    'Log at info level');
logger.log('warn',    'Log at warn level');
logger.log('error',   'Log at error level');


logger.silly('Log at silly level');
logger.debug('Log at debug level');
logger.verbose('Log at verbose level');
logger.info('Log at info level');
logger.warn('Log at warn level');
logger.error('Log at error level');
