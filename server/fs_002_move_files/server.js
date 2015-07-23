#!/usr/bin/env node
'use strict';

console.log('Hello world !');


var fs = require('fs-extra');
var async = require('async');

async.series([
	async.apply(fs.emptyDir, './workspace'),
	async.apply(fs.remove, './workspace.temp'),
	async.apply(fs.remove, './workspace2'),
	async.apply(fs.copy, './fixtures', './workspace'),
	async.apply(fs.mkdirp, './workspace/useless-dir/foo/bar/baz/hello')
], function (err) {
	if (err) return console.error(err);

	console.log('* preparation done.');

	/////// preparation done. Now let's play

	fs.move('./workspace/useless-dir', './workspace2', function (err) {
		if (err) return console.error(err);

		console.log('* success');
	});
});
