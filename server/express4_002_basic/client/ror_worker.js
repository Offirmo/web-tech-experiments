
self.requirejs_baseurl = '';

var debug_infos = {
	// https://developer.mozilla.org/en-US/docs/Web/API/WorkerLocation
	location: self.location,
	// https://developer.mozilla.org/en-US/docs/Web/API/WorkerNavigator
	navigator: self.navigator
};

// to be replaced as soon as the worker is ready
self.onmessage = function(e) {
	throw new Error('From worker : I got a message from my parent before I was ready !');
};

self.onerror = function(e) {	console.log('worker : seen "error" event', arguments); };

self.ononline = function() {	console.log('worker : seen "online" event'); };

self.onoffline = function() {	console.log('worker : seen "offline" event'); };

self.onclose = function() {	console.log('worker : seen "close" event'); };

//importScripts('bower_components/lodash/dist/lodash.js');

importScripts('bower_components/requirejs/require.js');
importScripts('misc/components.js');


// possible alternative https://github.com/chadly/RequireJS-Web-Workers
requirejs(
[
	'lodash',
	'javascript-state-machine',
	'webworker_helper'
],
function(_, StateMachine, WebworkerHelper) {
	'use strict';

	console.log('Hello from worker !', self.location);

	function postMessage(o) {
		var c = WebworkerHelper.clone_for_msg_passing(o);
		console.log('from worker, sending to parent :', o, 'cloned as', c);
		self.postMessage(c);
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

	var sm = StateMachine.create({
		initial: 'waiting_init',
		events: [
			{ name: 'init_done',         from: 'waiting_init',         to: 'loading_last_backup' },

			{ name: 'no_backup_found',   from: 'loading_last_backup',  to: 'waiting_event' },
			{ name: 'backup_load_error', from: 'loading_last_backup',  to: 'waiting_event' },
			{ name: 'backup_loaded',     from: 'loading_last_backup',  to: 'waiting_event' },

			{ name: 'fatal_error',       from: 'yellow', to: 'green'  }
		],
		callbacks: {
			onbeforeevent : function(event, from, to, msg) {
				console.log('[onbeforeevent] "' + event + '(' + msg + ')" : "' + from + '" -> "' + to + '"');
			},
			onleavestate : function(event, from, to, msg) {
				//console.log('[onleavestate]  "' + event + '(' + msg + ')" from state "' + from + '" to state "' + to + '"');
			},
			onenterstate : function(event, from, to, msg) {
				//console.log('[onenterstate]  "' + event + '(' + msg + ')" from state "' + from + '" to state "' + to + '"');
			},
			onafterevent : function(event, from, to, msg) {
				//console.log('[onafterevent]  "' + event + '(' + msg + ')" from state "' + from + '" to state "' + to + '"');
			}
		}
	});
	sm.init_done();

	self.onmessage = function(e) {
		console.log('worker : seen message from parent : ' + e.data); //, JSON.stringify(e));
		self.postMessage('Response from worker ! (to : ' + e.data + ')');
	};

});
