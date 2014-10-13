

console.error('Worker starting from : ' + location);
console.error('with : ' + JSON.stringify(navigator));

console.log('DaF with console ?', 'show me !');

console.log(this);
debugger;

importScripts('bower_components/requirejs/require.js');
importScripts('misc/components.js');


require({
	baseUrl: "./"
},
["require"],
function(require) {
	'use strict';

	console.log('Hello from required worker !');

});

self.onmessage = function(e) {
	self.postMessage('Response from worker !');
};

// Rest of your worker code goes here.
console.log('Hello from worker console !');
