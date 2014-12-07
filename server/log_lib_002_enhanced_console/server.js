#!/usr/bin/env node
'use strict';

var _ = require('lodash');
var logger = require('../../incubator/log')({enhanced: true});

var console_levels = ['log', 'info', 'warn', 'error'];

_.forEach(console_levels, function(level) {
	console[level](  'Hello world ! (from console, %s level)', level);
	logger[level](  'Hello world ! (from logger, %s level)', level);
});
