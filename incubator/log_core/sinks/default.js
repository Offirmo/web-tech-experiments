/**
 * Default logger sink.
 * Writes to console with respect to console_affinity.
 */

// if node.js : use amdefine (add it with npm)
if (typeof define !== 'function') { var define = require('amdefine')(module); }

define([
	'underscore'
],
function(_) {
	'use strict';

	var console_by_level = {
		log: console.log,
		debug: console.debug,
		info: console.info,
		warn: console.warn,
		error: console.error
	};

	function intelligent_console_log_sink(log_call) {
		var console_fn;
		if(log_call.console_affinity)
			console_fn = console_by_level[log_call.console_affinity];
		if(!console_fn)
			console_fn = console_by_level[log_call.level]; // who knows ?
		if(!console_fn)
			console_fn = console.error;

		console_fn.apply(console, log_call.args);
	}

	return {
		// objects are created via a factory, more future-proof
		'make_new': function() { return intelligent_console_log_sink; }
	};
});
