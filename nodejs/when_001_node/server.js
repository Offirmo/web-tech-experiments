#!/usr/bin/env node
'use strict';

console.log('Hello world !');

// https://github.com/cujojs/when/blob/master/docs/api.md#nodelift
var when = require('when');
var when_node = require('when/node');

// Lift all of the fs methods, but name them with a 'P' suffix
var promised_fs = when_node.liftAll(require('fs'), function(promisedFs, liftedFunc, name) {
	promisedFs[name + 'P'] = liftedFunc;
	return promisedFs;
});

promised_fs.readFileP('file.txt').done(console.log.bind(console));

promised_fs.readFileP('file.txt', {encoding: 'utf8'}).done(console.log.bind(console));
