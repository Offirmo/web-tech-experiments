#!/bin/sh
':' //# http://sambal.org/?p=1014 ; exec `dirname $0`/../../node_modules/.bin/babel-node "$0" "$@"
'use strict';

import fs from 'fs';


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
