#!/usr/bin/env node
'use strict';

console.log('Hello world !');

const spawnSync = require('child_process').spawnSync;

var git_result = spawnSync('git', [ 'rev-parse', '--abbrev-ref','HEAD' ], { timeout: 2000, encoding: 'utf8' });
var branch = git_result.error ? '???' : git_result.stdout.trim();

console.log('current branch is :', branch);
