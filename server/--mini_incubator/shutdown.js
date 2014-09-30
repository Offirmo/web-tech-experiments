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


var DEFAULT_CONFIG = {
	default_exit_code:       0, //< = no error
	default_error_exit_code: 1, //< used on error, unless hinted otherwise
	shutdown_timeout_ms:     10 * 1000, //< max time to shutdown before immediate (violent) kill
};


var ShutdownAgent = function ShutdownAgent(options) {
	this.config = _.defaults({}, options, DEFAULT_CONFIG);
	this.in_progress = false;
	this.shutdown_steps = [];
	this.exit = function(err, exit_code, misc) {
		console.log('* [shutdown] exiting with code : ' + exit_code + '...');
		process.exit(exit_code);
	};

	// immediately starts watching some important events
	this.seen_events = {
		'process.exit': false, // so far
		'cluster.worker.disconnect': false, // so far
		'process.disconnect': false, // so far
	};
	var this_ = this;
	process.once('exit', function() {
		this_.seen_events['process.exit'] = true;
	});
	process.once('disconnect', function() {
		this_.seen_events['process.disconnect'] = true;
	});
	if(cluster.worker) cluster.worker.once('disconnect', function() {
		this_.seen_events['cluster.worker.disconnect'] = true;
	});
};

// f = Function(callback, err, exit_code, misc)
ShutdownAgent.prototype.add_shutdown_step = function(f) {
	this.shutdown_steps.push(f);
};


// @param {Object}  context
// @param {Error}   context.err           - optional
// @param {Number}  context.err.exit_code - optional, the exit code to use with process.exit (if relevant)
// @param {Number}  context.exit_code     - optional, the exit code to use with process.exit (if relevant)
ShutdownAgent.prototype.start = function(err, exit_code, misc) {

	// avoid loops
	if(this.in_progress) {
		console.log('! [shutdown] attempted duplicate shutdown from', (new Error).stack);
		return;
	}
	this.in_progress = true;
	console.log('! [shutdown] start...', err, exit_code, misc);

	// sort out params
	if(_.isNumber(err)) {
		misc = exit_code;
		exit_code = err;
		err = undefined;
	}
	if(_.isObject(exit_code)) {
		misc = exit_code;
		exit_code = undefined;
	}
	if(!misc) misc = {};
	if(!exit_code) exit_code = this.compute_exit_code(err, misc);

	console.log('! [shutdown] starting with', err, exit_code, misc);

	this.execute_steps(err, exit_code, misc);
};

ShutdownAgent.prototype.execute_steps = function(err, exit_code, misc) {

	var shutdown_steps = _.map(this.shutdown_steps, function(step) {
		return _.partialRight(step, err, exit_code, misc);
	});

	// wrap in setTimeout to leave time to some other async handlers to fire,
	// for ex. the one monitoring cluster disconnect to avoid dup.
	setTimeout(function() {
		console.log('* [shutdown] starting shutdown steps...');
		async.parallel( shutdown_steps, function(err, results) {
			console.log('* [shutdown] all shutdown steps finished.', err);
			this.exit(err, exit_code, misc);
		});
	});

};


ShutdownAgent.prototype.compute_exit_code = function (err, misc) {

	if(err)
		if(err.exit_code)
			return err.exit_code;
		else
			return this.config.default_error_exit_code;

	// no error
	return this.config.default_exit_code;
};






module.exports = {

	launch: shutdown,

	// a classic
	add_worker_disconnect_shutdown_callback: add_worker_disconnect_shutdown_callback,
};







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

