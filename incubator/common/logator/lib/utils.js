/**
 * Global utils
 */

// if node.js : use amdefine (add it with npm)
if (typeof define !== 'function') { var define = require('amdefine')(module); }

define(function() {
	'use strict';

	// save original console primitives
	var original_console = {
		log: console.log,
		debug: console.debug || console.log, // since deprecated
		info: console.info,
		warn: console.warn,
		error: console.error,
	};

	// import a few useful functions,
	// to avoid dependencies to other libs
	var libs = {
		_: {
			// TODO
		}
	};

	return {
		original_console: original_console,
		libs: libs,
	};
});
