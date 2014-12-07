/**
 * Enricher which try to find which color
 * would most likely suit this lo call.
 */

// if node.js : use amdefine (add it with npm)
if (typeof define !== 'function') { var define = require('amdefine')(module); }

define([
	'lodash'
],
function(_) {
	'use strict';

	var color_by_level_name = {
		error: 'red',
		warn: 'yellow',
		log: 'default',
		debug: 'default',
		info: 'gray'
	};

	function enrich_with_color_affinity(log_call) {
		if(log_call.color_affinity) return; // nothing to do, already there
		if(log_call.level.color_affinity)
			log_call.color_affinity = log_call.level.color_affinity; // already computed
		if(color_by_level_name[log_call.level.name])
			log_call.color_affinity = color_by_level_name[log_call.level.name];
		else
			throw new Error('TODO compute color affinity via known usual names then by relative rank');

		if(! log_call.level.color_affinity)
			log_call.level.color_affinity = log_call.color_affinity; // save it for next time
	}

	return {
		// objects are created via a factory, more future-proof
		'make_new': function() { return enrich_with_color_affinity; }
	};
});
