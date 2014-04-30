#!/usr/bin/env node
'use strict';

var log_core = require('../../incubator/log_core');

var log = log_core.create();
log.add_level('debug');
log.add_level('error');

log.add_tag('begin');
log.add_tag('end');
log.add_tag('save');
log.add_tag('persist');

console.log('Hello %s ! (from console)', 'world');
log.debug('Hello %s ! (from log)', 'world');
log.error('Hello %s ! (from log)', 'world');
//log.persist;
/*
log.debug.persist.begin('Saving to %s...', 'server');
log.error.persist.begin('Saving to %s failed !', 'server');
*/
