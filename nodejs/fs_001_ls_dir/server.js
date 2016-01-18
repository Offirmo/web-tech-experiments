#!/usr/bin/env node
'use strict';

console.log('Hello world !');

var fs = require('fs');

fs.readdir('.', function (err, files) {
	if (err) {
		console.error(err);
		return;
	}

	files.forEach(function(lsEntry) {
		fs.lstat(lsEntry, function(err, stats) {
			if (err) {
				console.error(err);
				return;
			}

			console.log(lsEntry, stats, stats.isDirectory());
		});
	});
});
