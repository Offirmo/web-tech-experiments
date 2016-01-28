#!/usr/bin/env node
'use strict';

console.log('Hello world !');

// https://github.com/flatiron/winston

var winston = require('winston');

// XXX winston default filter is at info !
winston.remove(winston.transports.Console);
winston.add(winston.transports.Console, {
	level: 'silly', // Level of messages that this transport should log (default 'info').
	colorize: true // flag indicating if we should colorize output (default false).
});

winston.log('silly',   'Log at silly level');
winston.log('debug',   'Log at debug level');
winston.log('verbose', 'Log at verbose level');
winston.log('info',    'Log at info level');
winston.log('warn',    'Log at warn level');
winston.log('error',   'Log at error level');


winston.silly('Log at silly level');
winston.debug('Log at debug level');
winston.verbose('Log at verbose level');
winston.info('Log at info level');
winston.warn('Log at warn level');
winston.error('Log at error level');

winston.log('Log at ? level'); // ?
