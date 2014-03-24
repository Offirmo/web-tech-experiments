#!/usr/bin/env node
'use strict';

console.log('Hello world !');

// https://github.com/flatiron/winston

var winston = require('winston');

// prepare some custom log levels
var customLevels = {
	levels: {
		foo: 0,
		bar: 1,
		baz: 2,
		foobar: 3
	},
	colors: {
		foo: 'blue',
		bar: 'green',
		baz: 'yellow',
		foobar: 'red'
	}
};

// create the logger
var customLevelLogger = new (winston.Logger)({
	level: 'foo',
	levels: customLevels.levels,
	colors: customLevels.colors,
	transports: [
// setup console logging
		new (winston.transports.Console)({
			level: 'foo',
			levels: customLevels.levels,
			colorize: true
		})
	]
});

customLevelLogger.foo('some foo level-ed message');
customLevelLogger.bar('some bar level-ed message');
customLevelLogger.baz('some baz level-ed message');
customLevelLogger.foobar('some foobar level-ed message');

//winston.addColors(customLevels.colors);

customLevelLogger.foobar('some foobar level-ed message');
