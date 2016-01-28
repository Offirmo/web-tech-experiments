#!/usr/bin/env node
'use strict';

console.log('Hello world !');

// http://akdubya.github.io/dustjs/#guide

var dust = require('dustjs-linkedin');

var compiled = dust.compile('Hello {name}!', 'intro');

dust.loadSource(compiled);

dust.render('intro', {name: 'Fred'}, function(err, out) {
	console.log(out);
});
