#!/usr/bin/env node
'use strict';

var log_core = require('../../incubator/log_core');

var log = log_core.create();
log.add_level('error', 0);
log.add_level('debug', 1);

console.log('Hello %s ! (from console, log level)', 'world');
console.error('Beware %s ! (from console, error level)', 'world');
log.debug('Hello %s ! (from log, debug level)', 'world');
log.error('Beware %s ! (from log, error level)', 'world');
