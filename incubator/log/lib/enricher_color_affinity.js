/**
 * Enricher which try to find which color
 * would most likely suit this lo call.
 */

if (typeof exports === 'undefined') {
	// not node : browser or web worker
	// chalk is not available and not needed
	define([
		'lodash'
	],
	function (_) {
		'use strict';

		function identity(val) { return val; }

		function enrich_with_chalk_style(log_call) {
			if (log_call.chalk_style) return; // nothing to do, already there

			log_call.chalk_style = identity;
		}

		return {
			// objects are created via a factory, more future-proof
			'make_new': function () {
				return enrich_with_chalk_style;
			}
		};
	});
}
else {
	// if node.js : use amdefine (add it with npm)
	if (typeof define !== 'function') {
		var define = require('amdefine')(module);
	}

	define([
		'lodash',
		'chalk'
	],
	function (_, chalk) {
		'use strict';

		var chalk_style_by_level_name = {
			error: chalk.bold.red,
			warn: chalk.yellow,
			log: chalk.blue,
			debug: chalk.blue,
			info: chalk.gray
		};

		function enrich_with_chalk_style(log_call) {
			if (log_call.chalk_style) return; // nothing to do, already there
			if (log_call.level.chalk_style)
				log_call.chalk_style = log_call.level.chalk_style; // already computed
			else if (chalk_style_by_level_name[log_call.level.name])
				log_call.chalk_style = chalk_style_by_level_name[log_call.level.name];
			else
				throw new Error('TODO compute color affinity via known usual names then by relative rank');

			if (!log_call.level.chalk_style)
				log_call.level.chalk_style = log_call.chalk_style; // save it for next time
		}

		return {
			// objects are created via a factory, more future-proof
			'make_new': function () {
				return enrich_with_chalk_style;
			}
		};
	});
}
