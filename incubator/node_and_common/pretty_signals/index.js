/*
 * Helper with unix signals.
 */
'use strict';



var _ = require('lodash');

//var exit = require('exit'); // to exit with all output flushed, important.
var exit = function(suggested_exit_code, signal_description) {
	process.exit(suggested_exit_code);
};



module.exports = {
	install_verbose_handlers: install_verbose_handlers,

	set_exit_function: function(exit_function) {
		exit = exit_function;
	},

	leave_me_manage_this_signal: mark_signal_as_user_handled

};

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
	// Ctrl+C, has a default handler
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
	// has a default handler
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


var verbose_handlers_installed = false;
function install_verbose_handlers(log_signal_fn) {

	if(verbose_handlers_installed)
		throw new Error('Conflict ! Pretty signals verbose handlers already installed !');

	log_signal_fn = log_signal_fn || default_log_signal;

	_.forEach(known_signals, function(signal_description) {

		if(signal_description.handler_forbidden) return; // can't install any handler for this one

		(function(signal) {
			process.once(signal.name, function() {
				log_signal_fn(signal);
				execute_signal_action(signal);
			});
		})(signal_description);

	});
}


function mark_signal_as_user_handled(signal) {
	//console.log('marking user custom for ', signal);
	var signal_entry = _.findWhere(known_signals, {name: signal});
	if(!signal_entry) throw new Error('[pretty signals] couldn’t find signal by name : "' + signal + '" !');

	signal_entry.user_handled = true;
	//console.log('marking user custom for ', signal_entry);
}

function default_log_signal(signal) {
	console.log('\n');
	console.warn('* [pretty signals] seen signal %s "%s"', signal.name, signal.msg);
}

function execute_signal_action(signal_description) {
	if(signal_description.user_handled) return; // user handle it, nothing to do.

	if(signal_description.action === 'Term' || signal_description.action === 'Core') {
		console.log('! [pretty signals] Signal %s has "%s" disposition -> exiting...',
			signal_description.name,
			signal_description.action
		);

		var suggested_exit_code = 100 + signal_description.linux_x86_value;
		if(   signal_description.name === 'SIGINT'
		   || signal_description.name === 'SIGTERM'
		   || signal_description.name === 'SIGUSR2')
			suggested_exit_code = 0; // OK, normal way to exit

		exit(suggested_exit_code, signal_description);
	}
}
