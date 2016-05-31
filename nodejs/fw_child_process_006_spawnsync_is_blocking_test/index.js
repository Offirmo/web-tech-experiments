#!/usr/bin/env node
'use strict';

// http://www.hacksparrow.com/difference-between-spawn-and-exec-of-node-js-child_process.html

console.log('Hello world !')

///////////////////////////////////////////////////////

const spawnSync = require('child_process').spawnSync

///////////////////////////////////////////////////////

setInterval(() => console.log("Event loop is alive !"), 1000)

const executable = 'sleep'
const params = [ '10' ]
const options = {
	timeout: 5000,
	env: process.env,
	encoding: 'utf8'
}

console.log(`Spawn : spawning ${executable}`, params);
const result = spawnSync(executable, params, options);
console.log(`spawnSync : done`)
