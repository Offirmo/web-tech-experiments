/*
 * Console hack for displaying pid + cluster worker id
 * in front of every console output.
 */
'use strict';

/* REM : to log in this file :
original_console.log.call(console, 'blah blah', stuff);
 */
exports.install = install;

var _ = require('lodash');
var cluster = require('cluster');

var original_console = {
	log: console.log,
	info: console.info,
	error: console.error,
	warn: console.warn
};

var prefix = (function buildPrefix() {
	var prefix = '[';

	prefix += 'node#' + process.pid;

	if(cluster.isWorker) {
		prefix += '.';
		if(cluster.worker && cluster.worker.id)
			prefix += cluster.worker.id;
		else
			prefix += '?';
	}

	prefix += ']';
	return prefix;
})();

function rebindConsoleArgs(args) {
	if(_.isString(args[0])) {
		args[0] = prefix + ' ' + args[0];
	}
	else {
		// insert our prefix as 1st arg
		// REM that args is not an array https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/arguments
		//original_console.log.call(console, 'before rebinding', args.length, args);

		for(var i = args.length; i > 0; --i) {
			args[i] = args [i - 1];
		}
		args[0] = prefix;
		args.length++;
		//original_console.log.call(console, 'after rebinding', args.length, args);
	}
	return args;
}

var installed = false;
function install(log) {
	if(installed) return;

	if(log) console.log('[assuming_console] Installing console wraps for ' + prefix);

	console.log = function() {
		original_console.log.apply(console, rebindConsoleArgs(arguments));
	};
	console.info = function() {
		original_console.info.apply(console, rebindConsoleArgs(arguments));
	};
	console.error = function() {
		original_console.error.apply(console, rebindConsoleArgs(arguments));
	};
	console.warn = function() {
		original_console.warn.apply(console, rebindConsoleArgs(arguments));
	};

	installed = true;
}
