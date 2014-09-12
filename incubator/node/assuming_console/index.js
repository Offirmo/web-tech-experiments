/*
 * Console hack for displaying pid + cluster worker id
 * in front of every console output.
 */
'use strict';

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
		args.unshift(prefix);
	}
	return args;
}

var installed = false;
function install() {
	if(installed) return;

	console.log('Installing console wraps for ' + prefix);

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
