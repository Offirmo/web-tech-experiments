#!/usr/bin/env node
'use strict';

var _ = require('lodash');
var logger = require('../../incubator/common/logator')();

var console_levels = ['log', 'info', 'warn', 'error'];

_.forEach(console_levels, function(level) {
	console[level]( 'console : Hello world ! (%s level)', level);
	logger[level](  'logger  : Hello world ! (%s level)', level);
});
