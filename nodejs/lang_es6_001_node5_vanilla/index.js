#!/bin/sh
':' //# https://sambal.org/?p=1014 ; exec /usr/bin/env node --harmony_modules --harmony_regexps --harmony_proxies --harmony_sloppy_function --harmony_sloppy_let --harmony_unicode_regexps --harmony_reflect --harmony_destructuring --harmony_default_parameters --harmony_sharedarraybuffer --harmony_atomics --harmony_simd "$0" "$@"
'use strict';

// https://nodejs.org/en/docs/es6/
// node --v8-options | grep "in progress"

const fs = require('fs');


// to work, the following code MUST be called before anything else
let eventLoopCount = 0;
function eventLoopDetector() {
	if (eventLoopCount === 0) {
		// we are not yet in the loop
	}
	else {
		// we are in the loop
		if (eventLoopCount === 1)
			console.error(`
------- the event loop starts ! -------`);
		else
			console.error(`
------- event loop #${eventLoopCount} -------`);
		console.error('--- 1) timeouts / intervals :');
	}

	if (eventLoopCount !== 1) {
		fs.stat('foo', () => console.error('--- 2) I/O callbacks :'));
		setImmediate(() => console.error('--- 3) immediates :'));
	}

	eventLoopCount++;
	if (eventLoopCount < 12)
		setTimeout(eventLoopDetector);
}
eventLoopDetector();
