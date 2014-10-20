
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
	'webworker_helper',
],
function(_, WebworkerHelper) {
	'use strict';

	console.log('Hello from required worker !');

	function postMessageDebug(o) {
		var c = WebworkerHelper.clone_for_msg_passing(o);
		console.log('from worker, sending to parent :', o, 'cloned as', c);
		self.postMessage(c);
	}

	postMessageDebug('I loaded successfully and I\'m ready.');
	postMessageDebug('I can use lodash : ' + _.random());
	postMessageDebug('I can use webworker_helper : ' + WebworkerHelper.clone_for_msg_passing('foo'));

	postMessageDebug(5);
	postMessageDebug(new Number(6));
	postMessageDebug('foo');
	postMessageDebug(new String('new String foo'));
	postMessageDebug([5, 'foo']);
	postMessageDebug({
		location: self.location
	});

});
