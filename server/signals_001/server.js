#!/usr/bin/env node
'use strict';

console.log('Hello world !');

// Tests on unix signals
// create an express server,
// then feel free to kill it at pleasure to see what happen


// Interesting reads :
//   http://dailyjs.com/2012/03/15/unix-node-signals/
// Another test close to this one :
//  https://gist.github.com/coltrane/2599899
// just run me with `node server`

// "Many daemons accept SIGHUP to reload configuration files"
// "Another convention is to listen for SIGTERM to perform a graceful shutdown."

// pid file :
// http://blog.fgribreau.com/2012/02/snippet-cross-platform-pid-management.html


var _ = require('lodash');
var pretty_signals = require('../../incubator/node/pretty_signals');

console.log('\n*** My pid is ' + process.pid + ', please kill me ;) ***\n');

pretty_signals.install_verbose_handlers();





var express = require('express');

var listening_port = process.env.PORT || 4000;

var app = express();

var server = app.listen(listening_port, function() {
	console.log('Now listening on port ' + listening_port);
	console.log('(Ctrl+C to stop)');
});
server.on('close', function() { console.log('server close event', arguments); } );

function installDebugEventWatcher(event_emitter, event_id, event_emitter_name) {
	event_emitter_name = event_emitter_name || '?';
	event_emitter.on(event_id, function() {
		console.error('! --> ' + event_emitter_name + '.' + event_id /*+ '" with params :', arguments*/);
	});
	event_emitter.on(event_id, function() {
		console.error('!! --> ' + event_emitter_name + '.' + event_id /*+ '" with params :', arguments*/);
	});
}


installDebugEventWatcher(process, 'exit', 'process');
installDebugEventWatcher(process, 'uncaughtException', 'process');
process.on('uncaughtException', function() {
	console.error(arguments);
});
