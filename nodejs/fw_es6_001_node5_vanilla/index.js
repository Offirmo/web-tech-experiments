#!/bin/sh
':' //# http://sambal.org/?p=1014 ; exec `dirname $0`/../../../node_modules/.bin/babel-node "$0" "$@"
'use strict';

const fs = require('fs');

console.error(`------- code outside of the loop -------`);

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

setUpDelayed('->'); // direct




let setNextTickCount = 0;
function setNextTickDetector() {
  if (setNextTickCount > 0) {
    console.error(`- setNextTick #${setNextTickCount}`);
  }
  setNextTickCount++;
  if (setNextTickCount < 10)
    process.nextTick(setNextTickDetector);
}
process.nextTick(setNextTickDetector);


let setImmediateCount = 0;
function setImmediateDetector() {
  if (setImmediateCount > 0) {
    console.error(`- setImmediate #${setImmediateCount}`);
  }
  setImmediateCount++;
  if (setImmediateCount < 10) {
    setImmediate(setImmediateDetector);
    //process.nextTick(() => setImmediate(() => console.error('nextTicked setImmediate')));
  }
}
setImmediate(setImmediateDetector);



let setTimeoutCount = 0;
function setTimeoutDetector() {
  setTimeoutCount++;
  console.error(`- setTimeout #${setTimeoutCount}`);
  if (setTimeoutCount < 10)
    setTimeout(setTimeoutDetector);
}
setTimeout(setTimeoutDetector);

let intervalObject;
let setIntervalCount = 0;
function setIntervalDetector() {
  setIntervalCount++;
  console.error(`- setInterval #${setIntervalCount}`);
  if (setIntervalCount >= 10)
    clearInterval(intervalObject);
}
intervalObject = setInterval(setIntervalDetector);


function setUpDelayed(id) {
  console.error(id, 'scheduling setImmediate...');
  setImmediate(() => console.error(id, 'setImmediate !'));

  console.error(id, 'scheduling setTimeout...');
  setTimeout(() => console.error(id, 'setTimeout !'));

  console.error(id, 'scheduling process.nextTick...');
  process.nextTick(() => console.error(id, 'process.nextTick !'));
}


/*
setImmediate(() => setUpDelayed('from setImmediate ->'));

setNextTick(() => setUpDelayed('from setNextTick ->'));

process.nextTick(() => setUpDelayed('from process.nextTick ->'));
*/
