/**
 * Plain console sink
 * Useful when we follow js console standard.
 */

// if node.js : use amdefine (add it with npm)
if (typeof define !== 'function') { var define = require('amdefine')(module); }

define([
	'lodash',
	'./enricher_console_affinity'
],
function(_, ConsoleAffinityEnricher) {
	'use strict';

	var console_fn_by_level = {
		log: console.log,
		debug: console.debug || console.log, // since deprecated
		info: console.info,
		warn: console.warn,
		error: console.error
	};

	var enrich_with_console_affinity = ConsoleAffinityEnricher.make_new();

	function intelligent_console_log_sink(log_call) {
		enrich_with_console_affinity(log_call);

		var console_fn = console_fn_by_level[log_call.console_affinity];
		if(!console_fn)
			console_fn = console.error;

		console_fn.apply(console, log_call.args);
	}

	return {
		// objects are created via a factory, more future-proof
		'make_new': function() { return intelligent_console_log_sink; }
	};
});
