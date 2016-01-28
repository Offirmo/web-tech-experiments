#!/usr/bin/env node
'use strict';

console.log('Hello world !');

// do uncaught handler stack ?
// seems yes.

process.on('uncaughtException', function(err){
	console.log('uncaught err 1', err);
	//process.exit(1);
});

process.on('uncaughtException', function(err){
	console.log('uncaught err 2', err);
	//process.exit(1);
});

setTimeout(function() {
	throw new Error('Ha ha uncaught !');
});
