#!/bin/sh
':' //# https://sambal.org/?p=1014 ; exec /usr/bin/env node "$0" "$@"
'use strict';

console.log('Hello world !');

////////////////////////////////////////////////////////////

const _ = require('lodash');

// https://github.com/dthree/vorpal
var vorpal = require('vorpal')();

////////////////////////////////////////////////////////////

const APP_ID = 'mod_vorpal_002';
vorpal.history(APP_ID);
vorpal.localStorage(APP_ID);

vorpal
	.command('foo', 'Outputs "bar".')
	.action(function(args, callback) {
		this.log('bar');
		callback();
	});

vorpal.delimiter('tbrpg>');

vorpal.log('Hello world from vorpal !');

vorpal.exec('help');
//vorpal.execSync('help', { fatal: true });

vorpal.show();

vorpal.ui.input('exit');
