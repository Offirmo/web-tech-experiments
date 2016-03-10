#!/bin/sh
':' //# http://sambal.org/?p=1014 ; exec /usr/bin/env node --harmony_destructuring "$0" "$@"
'use strict';

console.log('Hello world !');

////////////////////////////////////////////////////////////

const _ = require('lodash');

// https://github.com/sindresorhus/ora
const ora = require('ora');

const spinner = ora('Loading undead unicorns');

spinner.start();

// Update
setTimeout(() => {
	spinner.color = 'yellow';
	spinner.text = 'Killing all the undead unicorns';
}, 1000);
