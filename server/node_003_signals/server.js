#!/usr/bin/env node
'use strict';

// just run me with `node server`

console.log('Hello world !');

console.log('My pid is ', process.pid);

var express = require('express');

var listening_port = process.env.PORT || 4000;

var app = express();

var server = app.listen(listening_port, function() {
	console.log('Now listening on port ' + listening_port);
	console.log('(Ctrl+C to stop)');
});
server.on('close', function() { console.log('close event', arguments); } );

function installDebugEventWatcher(event_emitter, event_id, event_emitter_name) {
	event_emitter_name = event_emitter_name || '?';
	event_emitter.on(event_id, function() {
		console.error('! --> ' + event_emitter_name + '.' + event_id /*+ '" with params :', arguments*/);
		// those signals may only have one handler, so let's do what the original handler would have done
		/*if(event_id === 'SIGHUP')
			process.exit(128 + 1);
		if(event_id === 'SIGINT')
			process.exit(128 + 2);
		if(event_id === 'SIGTERM')
			process.exit(128 + 15);*/
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

// unix signals, list taken from http://man7.org/linux/man-pages/man7/signal.7.html
// node infos http://nodejs.org/api/process.html#process_signal_events
// 1 SIGHUP "Hangup", terminate, overridable
installDebugEventWatcher(process, 'SIGHUP', 'process');
// 2 SIGINT Interrupt from keyboard, terminate, overridable
installDebugEventWatcher(process, 'SIGINT', 'process');
// 3 SIGQUIT "Quit" Quit from keyboard, terminate w core dump, overridable
installDebugEventWatcher(process, 'SIGQUIT', 'process');
// 4 SIGILL "Illegal instruction", terminate w core dump, overridable
installDebugEventWatcher(process, 'SIGILL', 'process');
// 5 SIGTRAP, "Trace/breakpoint trap", terminate w core dump, overridable (undocumented)
installDebugEventWatcher(process, 'SIGTRAP', 'process');
// 6 SIGABRT, "Aborted", Abort signal, terminate w core dump, overridable
installDebugEventWatcher(process, 'SIGABRT', 'process');
// 7 SIGBUS, "Bus error", terminate w core dump, overridable (undocumented)
installDebugEventWatcher(process, 'SIGBUS', 'process');
// 8 SIGFPE, "Floating point exception", terminate w core dump, overridable
installDebugEventWatcher(process, 'SIGFPE', 'process');
// 9 SIGKILL "Killed"
// (installing a handler is forbidden, throw error)
// 10 SIGUSR1 "Hit SIGUSR1 - starting debugger agent.", can add but not override
installDebugEventWatcher(process, 'SIGUSR1', 'process');
// 11 SIGSEGV "Segmentation fault", terminate w core dump, overridable
installDebugEventWatcher(process, 'SIGSEGV', 'process');
// 12 SIGUSR2 "User defined signal 2", terminate, overridable
installDebugEventWatcher(process, 'SIGUSR2', 'process');
// 13 SIGPIPE ? (no effect)
installDebugEventWatcher(process, 'SIGPIPE', 'process');
// 14 SIGALRM "Alarm clock", terminate, overridable
installDebugEventWatcher(process, 'SIGALRM', 'process');
// 15 SIGTERM, terminate, overridable
installDebugEventWatcher(process, 'SIGTERM', 'process');
// 16 SIGSTKFLT Stack fault, terminate (undocumented)
installDebugEventWatcher(process, 'SIGSTKFLT', 'process');
// 17 SIGCHLD ? (no effect)
installDebugEventWatcher(process, 'SIGCHLD', 'process');
// 18 SIGCONT ? -> no effect or unstop the process stopped by SIGSTOP
installDebugEventWatcher(process, 'SIGCONT', 'process');
// 19 SIGSTOP, stop the process
// (installing a handler is forbidden, throw error)
// 20 SIGTSTP, stop the process, can add but not override
installDebugEventWatcher(process, 'SIGTSTP', 'process'); // Ctrl+Z ask for background ?
// 21 SIGTTIN, stop the process, overridable
installDebugEventWatcher(process, 'SIGTTIN', 'process');
// 22 SIGTTOU, stop the process, overridable
installDebugEventWatcher(process, 'SIGTTOU', 'process');
// 23 SIGURG ? (no effect)
installDebugEventWatcher(process, 'SIGURG', 'process');
// 24 SIGXCPU "CPU time limit exceeded", terminate, overridable
installDebugEventWatcher(process, 'SIGXCPU', 'process');
// 25 SIGXFSZ "File size limit exceeded", terminate, overridable
installDebugEventWatcher(process, 'SIGXFSZ', 'process');
// 26 SIGVTALRM "Virtual timer expired", terminate, overridable
installDebugEventWatcher(process, 'SIGVTALRM', 'process');
// 27 SIGPROF "Profiling timer expired", terminate, overridable
installDebugEventWatcher(process, 'SIGPROF', 'process');
// 28 SIGWINCH ? (no effect)
installDebugEventWatcher(process, 'SIGWINCH', 'process');
// 29 SIGIO "I/O possible", terminate, overridable
installDebugEventWatcher(process, 'SIGIO', 'process');
// 30 SIGPWR "Power failure", terminate, overridable
installDebugEventWatcher(process, 'SIGPWR', 'process');
// 31 SIGSYS "Bad system call", terminate, overridable
installDebugEventWatcher(process, 'SIGSYS', 'process');
