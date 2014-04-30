#!/usr/bin/env node
'use strict';

console.log('Hello world !');
var log = require('../logger')('test');

var when = require('when');
var when_node = require('when/node');

// http://akdubya.github.io/dustjs/#guide
var dust = require('dustjs-linkedin');

// Lift all of the fs methods, but name them with a 'P' suffix
var promised_fs = when_node.liftAll(require('fs'), function(promisedFs, liftedFunc, name) {
	promisedFs[name + 'P'] = liftedFunc;
	return promisedFs;
});

function load_dust_template(path, name) {
	return promised_fs.readFileP(path, {encoding: 'utf8'})
	.then(function(text){
		var compiled = dust.compile(text, name);
		dust.loadSource(compiled);
		return name;
	});
}

load_dust_template('template.html', 'demo')
.then(function(name) {
	console.log('* template loaded')
	return when_node.call(dust.render, name, {name: 'Yves', title: 'Démonstration'});
})
.then(function(out) {
	console.log('out :', out);
})
.catch(function(err) {
	log.exception(err);
});
