'use strict';

var os = require('os');
//var process = require('process');

var _ = require('lodash');
var chalk = require('chalk');
var humanizeDuration = require('humanize-duration');
var bytes = require('bytes');


var ANNOTATION_FIELD = '__top_';
var START_HRTIME = process.hrtime();
var START_MEMORY_USAGE = process.memoryUsage();


var originals = {
	setTimeout: setTimeout,
	clearTimeout: clearTimeout,
	setInterval: setInterval,
	clearInterval: clearInterval,
	setImmediate: setImmediate,
	clearImmediate: clearImmediate,
};

var resources = {
	timeouts : {
		// created should = in_flight + expired + cleared
		created: 0,
		in_flight: 0,
		expired: 0,
		cleared: 0,
		// misc
		inflight_referenced: 0,
		inflight_unreferenced: 0,
	}
};

function onTimeoutCreation() {
	resources.timeouts.created++;
	resources.timeouts.in_flight++;
	resources.timeouts.inflight_referenced++;
}

// only for a valid, just fired timeout
function onTimeoutExpiration(context) {
	resources.timeouts.in_flight--;
	resources.timeouts.expired++;
	if(context.referenced)
		resources.timeouts.inflight_referenced--;
	else
		resources.timeouts.inflight_unreferenced--;
}
function onTimeoutClearing(context) {
	if(context.expired) {
		// already expired, nothing to do
		console.log('clearTimeout called on an already expired timeout.');
		return
	}

	resources.timeouts.in_flight--;
	resources.timeouts.cleared++;
	if(context.referenced)
		resources.timeouts.inflight_referenced--;
	else
		resources.timeouts.inflight_unreferenced--;
}


setTimeout = function setTimeout_wrapper() {
	var context = {
		expired: false, // so far
		referenced: true // so far
	};

	// hook the provided callback to know when the timeout expires
	var original_callback = arguments[0];
	arguments[0] = function setTimeoutCallback_wrapper() {
		// update annotations
		context.expired = true;
		// update stats
		onTimeoutExpiration(context);
		// clear references to avoid leaks
		context = null;
		// done
		return original_callback.apply(undefined, arguments);
	};

	var opaque_timeout_object = originals.setTimeout.apply(this, arguments);
	opaque_timeout_object[ANNOTATION_FIELD] = context; // for access by clearTimeout

	// update stats
	onTimeoutCreation();

	// add ref/unref hooks

	return opaque_timeout_object;
};

clearTimeout = function clearTimeout_wrapper(opaque_timeout_object) {
	var context = opaque_timeout_object[ANNOTATION_FIELD];

	originals.clearTimeout.apply(this, arguments);

	// update stats
	onTimeoutClearing(context);
};




var last_memoryUsage = START_MEMORY_USAGE;
function status() {

	//console.log('Host uptime: ', humanizeDuration(os.uptime() * 1000));

	var loadavg = os.loadavg();
	console.log('Host load average: ',
		chalk.dim( loadavg[0].toFixed(2)),
		           loadavg[1].toFixed(2),
		chalk.bold(loadavg[2].toFixed(2))
	);

	//console.log('Host mem: ', bytes(os.totalmem()), bytes(os.freemem()));

	var memoryUsage = process.memoryUsage();
	console.log('Node memory usage: ',
		// REM : RSS = resident set size
		// http://stackoverflow.com/a/12023436/587407
		'RSS ' + bytes(memoryUsage.rss) + ' (' +
		'+' + bytes(memoryUsage.rss - last_memoryUsage.rss) + '/' +
		'+' + bytes(memoryUsage.rss - START_MEMORY_USAGE.rss) + ')',
		'heapTotal ' + bytes(memoryUsage.heapTotal) + ' (' +
		'+' + bytes(memoryUsage.heapTotal - last_memoryUsage.heapTotal) + '/' +
		'+' + bytes(memoryUsage.heapTotal - START_MEMORY_USAGE.heapTotal) + ')',
		'heapUsed ' + bytes(memoryUsage.heapUsed) + ' (' +
		'+' + bytes(memoryUsage.heapUsed - last_memoryUsage.heapUsed) + '/' +
		'+' + bytes(memoryUsage.heapUsed - START_MEMORY_USAGE.heapUsed) + ')'
	);
	last_memoryUsage = memoryUsage;

	console.log('Node uptime: ', humanizeDuration(process.uptime() * 1000));
}


module.exports = {
	resources: resources,
	status: status,
};
