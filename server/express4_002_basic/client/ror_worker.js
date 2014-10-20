
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

self.onerror = function(e) {
	console.log('worker : seen "error" message', arguments);
};

self.ononline = function() {
	console.log('worker : seen "online" message');
};

self.onoffline = function() {
	console.log('worker : seen "offline" message');
};

self.onclose = function() {
	console.log('worker : seen "close" message');
};

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
	postMessage('I loaded successfully and I\'m ready.');



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

	/*
	var fsm = StateMachine.create({
		initial: 'looking_for_save',
		events: [
			{ name: 'warn',  from: 'green',  to: 'yellow' },
			{ name: 'panic', from: 'yellow', to: 'red'    },
			{ name: 'calm',  from: 'red',    to: 'yellow' },
			{ name: 'clear', from: 'yellow', to: 'green'  }
		]
	});*/

	self.onmessage = function(e) {
		console.log('worker : seen message from parent : ' + e.data); //, JSON.stringify(e));
		self.postMessage('Response from worker ! (to : ' + e.data + ')');
	};

});
