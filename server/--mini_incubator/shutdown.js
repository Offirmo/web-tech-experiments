/** A reusable, extendable graceful shutdown function.
 *
 * See also :
 * - https://github.com/Offirmo/domain-middleware
 * - https://github.com/mathrawka/express-graceful-exit
 */
'use strict';

var async = require('async');
var _ = require('lodash');
var cluster = require('cluster');


var config = {
	exit:                    default_exit_function, //< = process.exit with correct code
	default_exit_code:       0, //< = no error
	default_error_exit_code: 1,
	shutdown_timeout_ms:     10 * 1000,
};



module.exports = {

	// adjust configuration
	configure: function(new_config) {
		config = _.merge(config, new_config);
	},

	// @param {Object}  context
	// @param {Error}   context.err                 - optional
	// @param {Number}  context.err.exit_code       - optional, the exit code to use with process.exit (if relevant)
	// @param {Number}  context.exit_code           - optional, the exit code to use with process.exit (if relevant)
	launch: shutdown,

	is_launched: function() { return shutdown_in_progress; },

	// @param {Function(callback, context)} - a shutdown step
	add_shutdown_step: add_shutdown_step,

	// a classic
	add_worker_disconnect_shutdown_callback: add_worker_disconnect_shutdown_callback,
};


var shutdown_callbacks = [];


function add_shutdown_step(f) {
	shutdown_callbacks.push(f);
}


function add_worker_disconnect_shutdown_callback() {
	if(!cluster.worker) throw new Error('X [Shutdown] Can\'t disconnect if not a cluster worker !');

	// monitor worker status to avoid disconnecting it twice
	var isWorkerDisconnected = false;
	cluster.worker.on('disconnect', function() {
		//console.log('[shutdown] seen disconnect event')
		isWorkerDisconnected = true;
	});

	add_shutdown_step(function disconnect_worker(callback) {
		if (isWorkerDisconnected) return callback();

		try {
			// Let close all servers, die and let the master know we're dead.
			// The master should then will fork a new worker.
			console.log('* [shutdown] disconnecting cluster worker...');
			cluster.worker.disconnect();
			return callback();
		} catch (err) {
			// oh well, not much we can do at this point.
			console.error('X [shutdown] Error while disconnecting the worker !', err, err.stack);
			return callback(err);
		}
	});
}


var shutdown_in_progress = false;
function shutdown(err, exit_code) {
	if(shutdown_in_progress) {
		console.log('! [shutdown] duplicate shutdown from', (new Error).stack);
		return;
	}
	shutdown_in_progress = true;

	var context = {
		err: err,
		exit_code: exit_code
	};

	if(_.isNumber(context.err)) {
		context.exit_code = context.err;
		context.err = undefined;
	}

	var shutdown_steps = _.map(shutdown_callbacks, function(step) {
		return _.partialRight(step, context);
	});

	// wrap in setTimeout to leave time to some other async handlers to fire,
	// for ex. the one monitoring cluster disconnect to avoid dup.
	setTimeout(function() {
		console.log('* [shutdown] starting shutdown sequence...');
		async.parallel( shutdown_steps, function(err, results) {
			console.log('* [shutdown] shutdown sequence finished.');
			config.exit(context);
		});
	});
}


function setup_shutdown_timeout(context) {
	// TODO
}


function default_exit_function(context) {
	var exit_code = compute_exit_code(context);

	console.log('* [shutdown] exiting with code : ' + exit_code + '...');

	process.exit(exit_code);
}


function compute_exit_code(context) {

	if(context.exit_code)
		return context.exit_code;

	if(context.err)
		if(context.err.exit_code)
			return context.err.exit_code;
		else
			return config.default_error_exit_code;

	// no error
	return config.default_exit_code;
}
