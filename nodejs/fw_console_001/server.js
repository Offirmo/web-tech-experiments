#!/usr/bin/env node
'use strict';

// test of the console API

console.log('Hello world !');

// node.js console http://nodejs.org/api/stdio.html

console.time('timing example');

var bar = {name: 'kitten', status: 'playful'};
console.log(2,4,6,8,'foo',bar);
console.log('%s is %d years old.', 'Bob', 42);
//console.group('console levels tests');
console.log(  'console.log');
//console.debug('console.debug');
console.info( 'console.info');
console.warn( 'console.warn');
console.error('console.error');
//console.groupEnd();
console.trace('trace test');
console.dir(bar);

try {
	console.assert(0 === 1, 'assert example');
}
catch(e) {
	console.error(e);
}

console.timeEnd('timing example');


console.log('[log] Hello %s !', 'world');
// no debug ?
console.info('[log] Hello %s !', 'world');
console.error('[error] Hello %s !', 'world');
console.warn('[warn] Hello %s !', 'world');
console.dir('dir');
console.time('time');
console.timeEnd('time');
console.trace('[trace] Hello %s !', 'world');
console.assert(false, '[assert] Hello %s !', 'world');

