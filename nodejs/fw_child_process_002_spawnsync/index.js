#!/usr/bin/env node
'use strict';

console.log('Hello world !');

const spawnSync = require('child_process').spawnSync;
const util = require('util');

const executable = 'git';
const params = [ 'rev-parse', '--abbrev-ref','HEAD' ];
const options = {
	timeout: 5000,
	env: process.env,
	encoding: 'utf8'
};

console.log(`Exec : spawning ${executable}`, params);
const result = spawnSync(executable, params, options);

console.log('status', result.status);
console.log('error', util.inspect(result.error, { colors: true }));
console.log('output', util.inspect(result.output, { colors: true }));

console.log('final');






