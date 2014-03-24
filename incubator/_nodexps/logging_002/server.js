#!/usr/bin/env node
'use strict';

var log = require('../logger')('test');
var prettyjson = require('prettyjson');

console.log('Hello world !');


log.time("timing example");

var bar = {name: 'kitten', status: 'playful'};
log.log(2,4,6,8,"foo",bar);
log.log("%s is %d years old.", "Bob", 42);
log.log(  "console.log");
log.info( "console.info");
log.warn( "console.warn");
log.error("console.error");
log.trace("trace test");
log.dir(bar);

try {
	log.assert(0 === 1, "assert example");
}
catch(e) {
	log.error(e);
}

log.timeEnd("timing example");

function throwError() { throw new Error('foo') }
setTimeout(throwError, 1000)
