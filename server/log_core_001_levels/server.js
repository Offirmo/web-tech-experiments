#!/usr/bin/env node
'use strict';

var log_core = require('../../log_core');

var log = log_core.create();
log.add_level('debug');
log.add_level('error');

console.log('Hello %s ! (from console)', 'world');
log.debug('Hello %s ! (from log)', 'world');
log.error('Hello %s ! (from log)', 'world');
