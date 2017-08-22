#!/usr/bin/env node
'use strict';

// XXX this intercepts Ctrl+C !!!

console.log('Hello world ! Press any key combination...');

const readline = require('readline')

if (!process.stdout.isTTY)
	throw new Error('current term is not a tty !')

readline.emitKeypressEvents(process.stdin)
process.stdin.setRawMode(true)

process.stdin.on('keypress', (str, key) => {
	console.info('---- key pressed ----')
	console.log(str)
	console.log(key)
})
