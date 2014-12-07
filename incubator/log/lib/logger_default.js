// if node.js : use amdefine (add it with npm)
if (typeof define !== 'function') { var define = require('amdefine')(module); }

define([
		'lodash',
		'./core',
		'./sink_plain_console',
		'./sink_enhanced_console'
	],
	function(_, LoggerCore, PlainConsoleSink, EnhancedConsoleSink) {
		'use strict';

		function make_new(namespace, options) {
			var logger = LoggerCore.make_new(namespace);

			logger.add_level('error', 0, {});
			logger.add_level('warn',  1, {});
			logger.add_level('info',  2, {});
			logger.add_level('log',   3, {});
			logger.add_level('debug', 3, {}); // alias

			if(options.enhanced)
				logger.add_sink(EnhancedConsoleSink.make_new());
			else
				logger.add_sink(PlainConsoleSink.make_new());

			return logger;
		}

		return {
			make_new: make_new
		};
	});
