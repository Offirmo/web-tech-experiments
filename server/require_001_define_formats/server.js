#!/usr/bin/env node
'use strict';

console.log('Hello world !');

// node require of an AMD module WITHOUT define() --> FAIL
// var amd = require('./amd_full');
var amd1 = require('./amd_full_with_header'); //< this one is OK

// try to define define() as a global var
global.define = require('amdefine')(module);

var amd2 = require('./amd_full'); //< works
