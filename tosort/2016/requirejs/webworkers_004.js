
self.requirejs_baseurl = '';

self.onmessage = function(e) {
	console.log('worker : seen message from parent :', e.data); //, JSON.stringify(e));
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


importScripts('bower_components/requirejs/require.js');
importScripts('misc/components.js');

// possible alternative https://github.com/chadly/RequireJS-Web-Workers
requirejs(
[
	'lodash',
	'javascript-state-machine'
],
function(_, StateMachine) {
	'use strict';

	console.log('Hello from required worker !');

	self.postMessage('I loaded successfully and I\'m ready.');
	self.postMessage('I can use lodash : ' + _.random());
	self.postMessage('I can use javascript-state-machine : ' + StateMachine);

});
