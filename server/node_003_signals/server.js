#!/usr/bin/env node
'use strict';

// just run me with `node server`

console.log('Hello world !');

console.log('My pid is ', process.pid);


///////////////////////////////////////////////

// signals, sorted by linux x86 numeric code
// http://man7.org/linux/man-pages/man7/signal.7.html
// - name : official signal name
// - action : default signal "disposition", signal(7)
//      Term   Default action is to terminate the process.
//      Ign    Default action is to ignore the signal.
//      Core   Default action is to terminate the process and dump core (see core(5)).
//      Stop   Default action is to stop the process.
//      Cont   Default action is to continue the process if it is currently stopped.
// - handler_forbidden : node.js forbid to install a handler for this signal (throw error)
// - non_overridable : adding a handler doesn't cancels the default "disposition"
// - msg : what is written by default by a node process when receiving this msg
var known_signals = [
	{ linux_x86_value:  1, name: 'SIGHUP',    action: 'Term',
	                                          msg: 'Hangup'},
	// Ctrl+C
	{ linux_x86_value:  2, name: 'SIGINT',    action: 'Term',
	                                          msg: 'Interrupt from keyboard' }, // by me, no default msg
	{ linux_x86_value:  3, name: 'SIGQUIT',   action: 'Core',
	                                          msg: 'Quit' },
	{ linux_x86_value:  4, name: 'SIGILL',    action: 'Core',
	                                          msg: 'Illegal instruction' },
	{ linux_x86_value:  5, name: 'SIGTRAP',   action: 'Core',
	                                          msg: 'Trace/breakpoint trap' },
	{ linux_x86_value:  6, name: 'SIGABRT',   action: 'Core',
	                                          msg: 'Aborted' },
	{ linux_x86_value:  7, name: 'SIGBUS',    action: 'Core',
	                                          msg: 'Bus error' },
	{ linux_x86_value:  8, name: 'SIGFPE',    action: 'Core',
	                                          msg: 'Floating point exception' },
	{ linux_x86_value:  9, name: 'SIGKILL',   action: 'Term', handler_forbidden: true,
	                                          msg: 'Killed' },
	{ linux_x86_value: 10, name: 'SIGUSR1',   action: 'Debug node.js', non_overridable: true,
	                                          msg: 'User defined signal 1' }, // "Hit SIGUSR1 - starting debugger agent."
	{ linux_x86_value: 11, name: 'SIGSEGV',   action: 'Core',
	                                          msg: 'Segmentation fault' },
	{ linux_x86_value: 12, name: 'SIGUSR2',   action: 'Term',
	                                          msg: 'User defined signal 2' },
	{ linux_x86_value: 13, name: 'SIGPIPE',   action: 'Term',
	                                          msg: 'Broken pipe' }, // by me, no default msg
	{ linux_x86_value: 14, name: 'SIGALRM',   action: 'Term',
	                                          msg: 'Alarm clock' },
	{ linux_x86_value: 15, name: 'SIGTERM',   action: 'Term',
	                                          msg: 'Termination signal' }, // by me, no default msg
	{ linux_x86_value: 16, name: 'SIGSTKFLT', action: 'Term',
	                                          msg: 'Stack fault' }, // by me, no default msg
	{ linux_x86_value: 17, name: 'SIGCHLD',   action: 'Ign',
	                                          msg: 'Child stopped or terminated ?' }, // by me, no default msg
	{ linux_x86_value: 18, name: 'SIGCONT',   action: 'Cont',
	                                          msg: 'Continue if stopped' }, // by me, no default msg
	{ linux_x86_value: 19, name: 'SIGSTOP',   action: 'Stop', handler_forbidden: true,
	                                          msg: 'Stop process' }, // by me, no default msg
	// Ctrl+Z
	{ linux_x86_value: 20, name: 'SIGTSTP',   action: 'Stop', non_overridable: true,
	                                          msg: 'Stop process' }, // by me, no default msg
	{ linux_x86_value: 21, name: 'SIGTTIN',   action: 'Stop',
	                                          msg: 'Terminal input for background process' }, // by me, no default msg
	{ linux_x86_value: 22, name: 'SIGTTOU',   action: 'Stop',
	                                          msg: 'Terminal output for background process' }, // by me, no default msg
	{ linux_x86_value: 23, name: 'SIGURG',    action: 'Ign',
	                                          msg: 'Urgent condition on socket' }, // by me, no default msg
	{ linux_x86_value: 24, name: 'SIGXCPU',   action: 'Core',
	                                          msg: 'CPU time limit exceeded' },
	{ linux_x86_value: 25, name: 'SIGXFSZ',   action: 'Core',
	                                          msg: 'File size limit exceeded' },
	{ linux_x86_value: 26, name: 'SIGVTALRM', action: 'Term',
	                                          msg: 'irtual timer expired' },
	{ linux_x86_value: 27, name: 'SIGPROF',   action: 'Term',
	                                          msg: 'Profiling timer expired' },
	{ linux_x86_value: 28, name: 'SIGWINCH',  action: 'Ign',
	                                          msg: 'Window resize signal' }, // by me, no default msg
	{ linux_x86_value: 29, name: 'SIGIO',     action: 'Term',
	                                          msg: 'I/O possible' },
	{ linux_x86_value: 30, name: 'SIGPWR',    action: 'Term',
	                                          msg: 'Power failure' },
	{ linux_x86_value: 31, name: 'SIGSYS',    action: 'Core',
	                                          msg: 'Bad system call' },
];


var _ = require('lodash');

_.forEach(known_signals, function(signal) {
	if(signal.handler_forbidden) return;
	(function(signal) {
		process.on(signal.name, function() {
			log_signal(signal);
			if(signal.action === 'Term' || signal.action === 'Core') {
				console.warn('! Exiting following signal %s with "%s" disposition...', signal.name, signal.action);
				process.exit(128 + signal.linux_x86_value);
			}
		});
	})(signal);
});

function log_signal(signal) {
	console.log('! Caught signal %s "%s"', signal.name, signal.msg);
}

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

/*
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
*/
