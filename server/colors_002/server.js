#!/usr/bin/env node
'use strict';

console.log('Hello world !');

// print "special" (ASCII 128+) chars in color with their charcode

var _ = require('lodash');
var colors = require('colors');
function log_special(text) {
	text = '' + text;
	_.forEach(text, function(char) {
		var char_code = char.charCodeAt(0);
		if(char_code > 128)
			char = char.yellow;
		process.stdout.write(char);

		if(char_code > 128)
			process.stdout.write(('[' + char_code + ']').grey);
	});
	process.stdout.write('\n');
}

log_special('Hé hè bonjour monde !');
