#!/usr/bin/env node
'use strict';

console.log('Hello world !');

// https://github.com/flatiron/winston

var winston = require('winston');

winston.add(winston.transports.File, { filename: 'winston.log' });

// XXX winston default filter is at info !
winston.log('silly',   'Log at silly level');
winston.log('debug',   'Log at debug level');
winston.log('verbose', 'Log at verbose level');
winston.log('info',    'Log at info level');
winston.log('warn',    'Log at warn level');
winston.log('error',   'Log at error level');


winston.info('Log at info level');
winston.warn('Log at warn level');
winston.error('Log at error level');


winston.log('Log at ? level'); // Logs nothing !!!
