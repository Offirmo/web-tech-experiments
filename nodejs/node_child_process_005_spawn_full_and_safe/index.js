#!/usr/bin/env node
'use strict';

// https://www.hacksparrow.com/difference-between-spawn-and-exec-of-node-js-child_process.html

console.log('Hello world !')

///////////////////////////////////////////////////////

const spawn = require('child_process').spawn

///////////////////////////////////////////////////////

const executable = 'git'
const params = [ 'rev-parse', '--abbrev-ref','HEAD' ]
const options = {
	timeout: 5000,
	env: process.env,
}

console.log(`Spawn : spawning ${executable}`, params);
const spawn_instance = spawn(executable, params, options);

// listen to events

spawn_instance.on('error', err => {
	console.log(`Spawn : got err event :`, err)
});

spawn_instance.on('close', (code, signal) => {
	console.log(`Spawn : got event close with code "${code}" & signal "${signal}"`)
});

spawn_instance.on('disconnect', () => {
	console.log(`Spawn : got disconnect`)
});

spawn_instance.on('exit', (code, signal) => {
	console.log(`Spawn : got event exit with code "${code}" & signal "${signal}"`)
});

spawn_instance.stdin.on('data', data => {
	console.log(`Spawn : got stdin data event : "${data}"`);
});
spawn_instance.stdin.on('error', error => {
	console.log(`Spawn : got stdin error event : "${error}"`);
});

spawn_instance.stdout.on('data', data => {
	console.log(`Spawn : got stdout data event : "${data}"`);
});
spawn_instance.stdout.on('error', error => {
	console.log(`Spawn : got stdout error event : "${error}"`);
});

spawn_instance.stderr.on('data', data => {
	console.log(`Spawn : got stderr data event : "${data}"`);
});
spawn_instance.stderr.on('error', error => {
	console.log(`Spawn : got stderr error event : "${error}"`);
});

console.log('final')

