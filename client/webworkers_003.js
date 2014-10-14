
self.requirejs_baseurl = 'http://172.30.2.160:3000/';

console.log('hello from webworker ! starting from : ' + location);
//console.error('with : ' + JSON.stringify(navigator));

/*
self.onmessage = function(e) {
	console.log('worker : seen message from parent : ' + JSON.stringify(e));
};*/

//console.log('DaF with console ?', 'show me !');

//console.log(this);
//debugger;

importScripts('bower_components/javascript-state-machine/state-machine.js');

importScripts('bower_components/requirejs/require.js');
importScripts('misc/components.js');

/*
require({
	baseUrl: './'
},*/

requirejs(
[
	'javascript-state-machine'
],
function(jsm) {
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

	//console.log('Hello from required worker !');

	self.onmessage = function(e) {
		console.log('worker : seen message from parent : ', e.data, JSON.stringify(e));
		self.postMessage('Response from worker !');
	};

	self.postMessage('from worker : I\'m ready.');
});
