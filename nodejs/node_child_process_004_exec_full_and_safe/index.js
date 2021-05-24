#!/usr/bin/env node
'use strict';

console.log('Hello world !');

https://www.hacksparrow.com/difference-between-spawn-and-exec-of-node-js-child_process.html

const exec = require('child_process').exec;

const executable = 'git';
const params = [ 'rev-parse', '--abbrev-ref','HEAD' ];
const options = {
	timeout: 5000,
	env: process.env,
};

console.log(`Exec : spawning ${executable}`, params);
const command = [ executable ].concat(params).join(' ');
const child = exec(command, options, (error, stdout, stderr) => {
	console.log(`Exec stdout: "${stdout}"`);
	console.log(`Exec stderr: "${stderr}"`);
	if (error !== null) {
		console.log(`Exec error: ${error}`);
	}
});

// listen to events
child.on('close', (code, signal) => {
	console.log(`Exec : got event close with code "${code}" & signal "${signal}"`)
});

child.on('disconnect', () => {
	console.log(`Exec : got disconnect`)
});

child.on('error', err => {
	console.log(`Exec : got err event :`, err)
});

child.on('exit', (code, signal) => {
	console.log(`Exec : got event exit with code "${code}" & signal "${signal}"`)
});


child.stdout.on('data', data => {
	console.log(`Exec : got stdout data event : "${data}"`);
});

child.stderr.on('data', data => {
	console.log(`Exec : got stderr data event : "${data}"`);
});

console.log('final');
