/*
 * Helper with unix signals.
 */
'use strict';

exports.install_verbose_handlers = install_verbose_handlers;

var _ = require('lodash');
var betterExit = require('exit'); // to exit with all output flushed, important.
	// cf.
	// https://github.com/joyent/node/issues/8329
	// https://www.npmjs.org/package/exit


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

function install_verbose_handlers(log_signal_fn) {
	log_signal_fn = log_signal_fn || default_log_signal;
	_.forEach(known_signals, function(signal) {
		if(signal.handler_forbidden) return;
		(function(signal) {
			process.on(signal.name, function() {
				log_signal_fn(signal);
				if(signal.action === 'Term' || signal.action === 'Core') {
					console.log('! Exiting following signal %s with "%s" disposition...', signal.name, signal.action);
					console.log('! Exiting with', 100 + signal.linux_x86_value);

					setTimeout(function() {
						betterExit(100 + signal.linux_x86_value);
					}, 2000);
				}
			});
		})(signal);
	});
}

function default_log_signal(signal) {
	console.warn('! Caught signal %s "%s"', signal.name, signal.msg);
}
