#!/usr/bin/env node
'use strict';

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
