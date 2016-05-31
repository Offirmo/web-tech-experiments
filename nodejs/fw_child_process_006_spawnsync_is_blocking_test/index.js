#!/usr/bin/env node
'use strict';

// http://www.hacksparrow.com/difference-between-spawn-and-exec-of-node-js-child_process.html

console.log('Hello world !')

///////////////////////////////////////////////////////

const spawn = require('child_process').spawn

///////////////////////////////////////////////////////

setInterval(() => console.log("Event loop is alive !"), 1000)

const executable = 'sleep'
const params = [ '10' ]
const options = {
	timeout: 5000,
	env: process.env,
}

console.log(`Spawn : spawning ${executable}`, params);
const spawn_instance = spawn(executable, params, options);

spawn_instance.on('close', (code, signal) => {
	console.log(`Spawn : got event close with code "${code}" & signal "${signal}"`)
});

