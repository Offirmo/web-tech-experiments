// if node.js : use amdefine (add it with npm)
if (typeof define !== 'function') { var define = require('amdefine')(module); }

define([
	'underscore',
	'./lib/core',
	'./lib/logger_default'
],
function(_, LoggerCore, LoggerDefault) {
	'use strict';

	var DefaultLogger = LoggerDefault; // so far

	function make_new(namespace, options) {
		if(!_.isString(namespace)) {
			options = namespace;
			namespace = '';
		}
		return LoggerDefault.make_new(namespace, options);
	}
	make_new.Core = LoggerCore;
	make_new.make_new = make_new; // to allow the Logator.make_new() syntax

	Object.defineProperty(make_new, 'DefaultLogger', {
		enumerable: true, // why not ?
		set: function(val) {
			DefaultLogger = val;
		},
		get: function() {
			return global_module_instance;
		}
	});

	return make_new;
});
