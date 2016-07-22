/**
 * Enricher which try to find which standard console level
 * would most likely suit this lo call.
 */

// if node.js : use amdefine (add it with npm)
if (typeof define !== 'function') { var define = require('amdefine')(module); }

define([
	'lodash'
],
function(_) {
	'use strict';

	var console_levels = ['log', 'debug', 'info', 'warn', 'error'];

	function enrich_with_console_affinity(log_call) {
		if(log_call.console_affinity) return; // nothing to do, already there
		if(log_call.level.console_affinity)
			log_call.console_affinity = log_call.level.console_affinity; // already computed
		if(_.includes(console_levels, log_call.level.name))
			log_call.console_affinity = log_call.level.name;
		else
			throw new Error('TODO compute console affinity via known usual names then by relative rank');

		if(! log_call.level.console_affinity)
			log_call.level.console_affinity = log_call.console_affinity; // save it for next time
	}

	return {
		// objects are created via a factory, more future-proof
		'make_new': function() { return enrich_with_console_affinity; }
	};
});
