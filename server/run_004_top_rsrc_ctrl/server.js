#!/usr/bin/env node
'use strict';

console.log('Hello world !');

var top = require('../--mini_incubator/top/top');

var agent = require('webkit-devtools-agent');
agent.start();







setInterval(function() {
	top.status();
	console.log(top.resources);

	var opaque1 = setTimeout(function hello(name) {
		console.log('timeout ! Hello, ' + name + ' !');
	}, 1000, 'World');

	var opaque2 = setTimeout(function goodbye(name) {
		console.log('timeout ! goodbye, ' + name + ' !');
	}, 2000, 'World');

	setTimeout(function() {
		clearTimeout(opaque1); // already expired
		clearTimeout(opaque2);
	}, 1200);

}, 1000);



//// https://github.com/felixge/node-memory-leak-tutorial
/*
function LeakingClass() {}
var leaks = [];
setInterval(function() {
	for (var i = 0; i < 100; i++) {
		leaks.push(new LeakingClass);
	}

	console.error('Leaks: %d', leaks.length);
	top.status();
}, 1000);
top.status();
*/

