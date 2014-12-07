/**
 * Enhanced console sink
 * with timestamp, color, level
 */

// if node.js : use amdefine (add it with npm)
if (typeof define !== 'function') { var define = require('amdefine')(module); }

define([
	'lodash',
	'chalk',
	'./enricher_console_affinity',
	'./enricher_color_affinity',
	'./enricher_timestamp_string'
],
function(_, chalk, ConsoleAffinityEnricher, TimestampStringEnricher) {
	'use strict';

	var console_fn_by_level = {
		log: console.log,
		debug: console.debug || console.log, // since deprecated
		info: console.info,
		warn: console.warn,
		error: console.error
	};

	var enrich_with_console_affinity = ConsoleAffinityEnricher.make_new();
	var enrich_with_timestamp_string = TimestampStringEnricher.make_new();

	// args is expected to be an array
	function rebindConsoleArgsWithPrefix(args, prefix) {
		if(_.isString(args[0])) {
			args[0] = prefix + ' ' + args[0];
		}
		else {
			// insert our prefix as 1st arg
			args.unshift(prefix);
		}
		return args;
	}

	function intelligent_console_log_sink(log_call) {
		enrich_with_console_affinity(log_call);
		enrich_with_color_affinity(log_call);
		enrich_with_timestamp_string(log_call);

		var console_fn = console_fn_by_level[log_call.console_affinity];
		if(!console_fn)
			console_fn = console.error;

		var colored_separator = chalk[log_call.color_affinity]('-');
		var args = log_call.args.slice(0); // clone the args to not pollute other sinks
		rebindConsoleArgsWithPrefix(args,
			log_call.timestamp_string
			+ ' ' + colored_separator + ' '
			+ log_call.level.name.toUpperCase()
			+ ' ' + colored_separator
		);

		console_fn.apply(console, args);
	}

	return {
		// objects are created via a factory, more future-proof
		'make_new': function() { return intelligent_console_log_sink; }
	};
});
