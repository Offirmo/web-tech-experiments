#!/usr/bin/env node
'use strict';

console.log('Hello world !');

const spawn = require('child_process').spawn;

const executable = 'git';
const params = [ 'rev-parse', '--abbrev-ref','HEAD' ];
const options = {
	timeout: 5000,
	env: process.env,
};

console.log(`Exec : spawning ${executable}`, params);
const spawn_instance = spawn(executable, params, options);

spawn_instance.on('error', err => {
	console.log(`Exec : got err:`, err);
});

//setTimeout(() => reject(new Error('Exec : timeout')), options.timeout_ms).unref();

spawn_instance.stdout.on('data', data => {
	console.log(`Exec : stdout: "${data}"`);
});

spawn_instance.stderr.on('data', data => {
	console.log(`Exec : got stderr : "${data}"`);
});

spawn_instance.on('close', code => {
	console.log(`Exec : child process exited with code ${code}`);
	if (code !== 0)
		reject(new Error(`Exec : child process exited with code ${code}`));
});

console.log('final');
