#!/usr/bin/env node
'use strict';

console.log('Hello world ! Press any key combination...');

process.on('exit', function(code) {
	console.log('* process.exit detected, about to exit with code :', code);
});


const readline = require('readline')

if (!process.stdout.isTTY)
	throw new Error('current term is not a tty !')

readline.emitKeypressEvents(process.stdin)
process.stdin.setRawMode(true)

process.stdin.on('keypress', (str, key) => {
	console.info('---- key pressed ----')
	console.log(str)
	console.log(key)

	if (key.ctrl && key.name === 'c')
		process.kill(process.pid, 'SIGINT');
})
