#!/usr/bin/env node
'use strict';

console.log('Hello world !');

var fs = require('fs-extra');

const data = JSON.parse(`
{"action":"popover_v2_signalDataRefresh","data":{},"type":"popover_v2_signalDataRefresh"}
`)
console.dir(data, {colors: true})

fs.outputJsonSync('foo.json', data, {spaces: 2})
