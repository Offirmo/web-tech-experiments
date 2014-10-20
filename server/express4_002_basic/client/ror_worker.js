
self.requirejs_baseurl = '';

var debug_infos = {
	// https://developer.mozilla.org/en-US/docs/Web/API/WorkerLocation
	location: self.location,
	// https://developer.mozilla.org/en-US/docs/Web/API/WorkerNavigator
	navigator: self.navigator
};

var worker_inbox = [];
self.onmessage = function(e) {
	worker_inbox.push(e);
	console.log('worker : seen message from parent :', e);
};


function log_obj(s, o) {
	self.postMessage({
		verb: 'POST',
		url: '/debug',
		data: {
			message: s,
			object: o
		}
	});
}
log_obj('debug_infos', debug_infos);

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


importScripts('bower_components/requirejs/require.js');
importScripts('misc/components.js');

// possible alternative https://github.com/chadly/RequireJS-Web-Workers
requirejs(
[
	'javascript-state-machine'
],
function(StateMachine) {
	'use strict';

	var fsm = StateMachine.create({
		initial: 'green',
		events: [
			{ name: 'warn',  from: 'green',  to: 'yellow' },
			{ name: 'panic', from: 'yellow', to: 'red'    },
			{ name: 'calm',  from: 'red',    to: 'yellow' },
			{ name: 'clear', from: 'yellow', to: 'green'  }
		]
	});

	fsm.warn();

	console.log('Hello from required worker !');

	//throw new Error('foo');

	self.onmessage = function(e) {
		console.log('worker : seen message from parent : ', e.data); //, JSON.stringify(e));
		self.postMessage('Response from worker ! (to : ' + e.data + ')');
	};

	self.postMessage('from worker : I\'m ready.');
});
