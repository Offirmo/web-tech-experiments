
self.requirejs_baseurl = 'http://172.30.2.160:3000/';
//self.requirejs_baseurl = 'http://192.168.56.100:3000/';

// https://developer.mozilla.org/en-US/docs/Web/API/WorkerLocation
console.log('hello from webworker ! starting from : ' + self.location);

// https://developer.mozilla.org/en-US/docs/Web/API/WorkerNavigator
console.log('hello from webworker ! with : ' + JSON.stringify(self.navigator));

//console.log('DaF with console ?', 'show me !');

// this one will be replaced later
self.onmessage = function(e) {
	console.log('worker : seen message from parent while I was initializing: ', e.data); //, JSON.stringify(e));
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
