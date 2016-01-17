/**
 * Plain console sink
 * Useful when we follow js console standard.
 */

// if node.js : use amdefine (add it with npm)
if (typeof define !== 'function') { var define = require('amdefine')(module); }

define([
	'./utils',
	'./enricher_console_affinity'
],
function(utils, ConsoleAffinityEnricher) {
	'use strict';

	var console_fn_by_level = utils.original_console;

	var enrich_with_console_affinity = ConsoleAffinityEnricher.make_new();

	function plain_console_sink(log_call) {
		enrich_with_console_affinity(log_call);

		var console_fn = console_fn_by_level[log_call.console_affinity];
		if(!console_fn)
			console_fn = console.error;

		console_fn.apply(console, log_call.args);
	}

	return {
		// objects are created via a factory, more future-proof
		'make_new': function() { return plain_console_sink; }
	};
});
