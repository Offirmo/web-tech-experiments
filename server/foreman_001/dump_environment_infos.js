'use strict';

var os = require('os');
var cluster = require('cluster');

var _ = require('lodash');
var prettyjson = require('prettyjson');
var moment = require('moment-precise-range');
var jss = require('json-stringify-safe');

exports.gather_infos = gather_infos;
exports.dump_infos = dump_infos;
exports.install_rsrc_watcher = install_rsrc_watcher;

// TODO identify OS

var original_console = {
	log: console.log,
	info: console.info,
	error: console.error,
	warn: console.warn
};

function reBindArgs(args) {
	var prefix = '[worker #' + (cluster.worker ? cluster.worker.id : '?') + ']';
	if(_.isString(args[0])) {
		args[0] = prefix + ' ' + args[0];
	}
	else {
		args.unshift(prefix);
	}
	return args;
}
if(cluster.isWorker && cluster.worker && cluster.worker.id) {
	console.log('Installing console wraps for worker #' + cluster.worker.id);
	var worker_id = cluster.worker.id;
	console.log = function() {
		original_console.log.apply(console, reBindArgs(arguments));
	}
	console.info = function() {
		original_console.info.apply(console, reBindArgs(arguments));
	}
	console.error = function() {
		original_console.error.apply(console, reBindArgs(arguments));
	}
	console.warn = function() {
		original_console.warn.apply(console, reBindArgs(arguments));
	}
}

reBindArgs('foo', 5);

/** Gather this program environment infos.
 *
 * Useful for debugging.
 *
 * Use cases :
 * - dump infos in console at start
 * - gather infos in an object to be sent to client or elsewhere
 * - periodically dump system status
 */

function gather_infos() {

	// JSON.parse(jss(cluster.worker))
	var cluster_worker_infos = _.pick(cluster.worker, [
		'id', 'uniqueID', 'workerID', 'state',
		'debugPort', 'maxTickDepth', '_handleQueue', 'connected', 'title'
	]);
	cluster_worker_infos['...'] = '';

	var infos = {
		entry_point : require.main.filename,

		process: {
			pid: process.pid,
			title: process.title,
			getgid: process.getgid(),
			getuid: process.getuid(),
			getgroups: process.getgroups(),
			umask: process.umask(),
			argv: process.argv,
			execArgv: process.execArgv,
			execPath: process.execPath,
			arch: process.arch,
			platform: process.platform,
			maxTickDepth: process.maxTickDepth,
			version: process.version,
			versions: process.versions,
			config: process.config,
			features: process.features,
			env: process.env
		},

		os: {
			cpus: os.cpus()
		},

		cluster: {
			isMaster: cluster.isMaster,
			isWorker: cluster.isWorker,
			worker_infos: cluster.isWorker ? cluster_worker_infos : 'n/a'
		}
	};

	return (infos);
}

function dump_infos() {
	console.log('\n*** Hello from node program "' + require.main.filename + '" ***');
	console.log(
		prettyjson.render(
			gather_infos()
		)
	);
}

function humanMemSize(size) {
	if(!size) return '0 B';
	var i = Math.floor( Math.log(Math.abs(size)) / Math.log(1024) );
	var str = ( size / Math.pow(1024, i) ).toFixed(2) * 1 + ' ' + ['B', 'kB', 'MB', 'GB', 'TB'][i];
	return str;
};

function install_rsrc_watcher(interval) {
	var initial_memory = process.memoryUsage();
	var last_memory = initial_memory;
	setInterval(
		function () {
			var up = process.uptime();
			var prog_start = moment().add(-up, 'seconds');
			var test = moment.duration(-up * 1000);
			var mem = process.memoryUsage();

			console.log('- uptime :', moment.preciseDiff(prog_start, moment(), {year: true, month: true, day: true, hour: true, minute: true}) + (up >= 60 ? ' ' : '') + up%60 + ' seconds' );
			console.log('- memory usage :',
				'rss ' + humanMemSize(mem.rss) + ' (' +
					'+' + humanMemSize(mem.rss - last_memory.rss) +
					'/+' + humanMemSize(mem.rss - initial_memory.rss) + ')',
				'heapTotal ' + humanMemSize(mem.heapTotal) + ' (' +
					'+' + humanMemSize(mem.heapTotal - last_memory.heapTotal) +
					'/+' + humanMemSize(mem.heapTotal - initial_memory.heapTotal) + ')',
				'heapUsed ' + humanMemSize(mem.heapUsed) + ' (' +
					'+' + humanMemSize(mem.heapUsed - last_memory.heapUsed) +
					'/+' + humanMemSize(mem.heapUsed - initial_memory.heapUsed) + ')'
			);
			last_memory = mem;
		},
		interval || 30 * 1000
	).unref();
}
