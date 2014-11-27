
var in_web_worker = (typeof window === 'undefined') && (typeof self !== 'undefined');
console.log('in_web_worker ?', in_web_worker);

if (in_web_worker) {
	// we are in a web worker
	self.requirejs_baseurl = '';

	var debug_infos = {
		// https://developer.mozilla.org/en-US/docs/Web/API/WorkerLocation
		location: self.location,
		// https://developer.mozilla.org/en-US/docs/Web/API/WorkerNavigator
		navigator: self.navigator
	};

	// to be replaced as soon as the worker is ready
	self.onmessage = function (e) {
		throw new Error('From worker : I got a message from my parent before I was ready !');
	};

	self.onerror = function (e) {
		console.log('worker : seen "error" event', arguments);
	};

	self.ononline = function () {
		console.log('worker : seen "online" event');
	};

	self.onoffline = function () {
		console.log('worker : seen "offline" event');
	};

	self.onclose = function () {
		console.log('worker : seen "close" event');
	};

	//importScripts('bower_components/lodash/dist/lodash.js');
	importScripts('bower_components/requirejs/require.js');
	importScripts('misc/components.js');
}

// possible alternative https://github.com/chadly/RequireJS-Web-Workers
requirejs(
[
	'lodash',
	'javascript-state-machine',
	'webworker_helper'
],
function(_, StateMachine, WebworkerHelper) {
	'use strict';

	var config = {
		tick_period_ms : 500
	};

	if (in_web_worker)
		console.log('Hello from worker !', self.location);

	function postMessage(o) {
		// for convenience, raw strings are turned into a log
		if(_.isString(o)) {
			o = {
				verb: 'POST',
				url: '/log',
				data: [ o ]
			};
		}
		if(! _.isObject(o) || !(o.verb && o.url)) {
			throw new Error('Incorrect argument for postMessage !');
		}
		if (in_web_worker) {
			var c = WebworkerHelper.clone_for_msg_passing(o);
			//console.log('from worker, sending to parent :', o, 'cloned as', c);
			self.postMessage(c);
		}
		else
			console.log(o);
	}
	postMessage('I loaded successfully and I’m ready.');

	var logger = {
		log: function log() {
			postMessage({
				verb: 'POST',
				url: '/log',
				data: _.values(arguments)
			});
		}
	};
	logger.log('Worker started', debug_infos);

	// https://github.com/jakesgordon/javascript-state-machine
	var sm = StateMachine.create({
		initial: '_waiting_init',
		events: [
			{ name: 'init_done',         from: '_waiting_init',         to: '_loading_last_backup' },

			{ name: 'no_backup_found',   from: '_loading_last_backup',  to: '_starting_up' },
			{ name: 'backup_load_error', from: '_loading_last_backup',  to: '_starting_up' },
			{ name: 'backup_loaded',     from: '_loading_last_backup',  to: '_starting_up' },

			{ name: 'started',           from: '_starting_up',          to: '_waiting_event' },

			{ name: 'tick',              from: '_waiting_event',        to: '_processing_tick' },
			{ name: 'cmd',               from: '_waiting_event',        to: '_processing_cmd' },
			{ name: 'action',            from: '_waiting_event',        to: '_processing_action' },

			{ name: 'fatal_error',       from: [
				'_loading_last_backup',
				'_starting_up',
				'_waiting_event',
				'_processing_tick',
				'_processing_cmd',
				'_processing_action'
			],                                                         to: '_error'  }
		],
		callbacks: {
			onbeforeevent : function(event, from, to, msg) {
				logger.log('[onbeforeevent] "' + event + '(' + msg + ')" : "' + from + '" -> "' + to + '"');
				return true;
			},
			onleavestate : function(event, from, to, msg) {
				logger.log('[onleavestate]  "' + event + '(' + msg + ')" from state "' + from + '" to state "' + to + '"');
				return true;
			},
			onenterstate : function(event, from, to, msg) {
				logger.log('[onenterstate]  "' + event + '(' + msg + ')" from state "' + from + '" to state "' + to + '"');
				return true;
			},
			onafterevent : function(event, from, to, msg) {
				logger.log('[onafterevent]  "' + event + '(' + msg + ')" from state "' + from + '" to state "' + to + '"');
				return true;
			},

			on_error : function() {
				console.error('Unknown internal error !');
				return true;
			},

			on_loading_last_backup : function() {
				console.log('hello', sm);
				sm.backup_load_error();
				return true;
			}
		}
	});
	console.log('sm', sm);
	sm.init_done();

	self.onmessage = function(e) {
		console.log('worker : seen message from parent : ' + e.data); //, JSON.stringify(e));
		self.postMessage('Response from worker ! (to : ' + e.data + ')');
	};

});
