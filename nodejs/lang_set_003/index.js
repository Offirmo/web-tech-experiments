#!/usr/bin/env node
'use strict';

console.log('Hello world !');
/*
var k1 = { color: 'red' }
var k2 = { color: 'blue' }
var k3 = { color: 'green' }
*/

var k1 = require('lodash').debounce
var k2 = require('lodash').throttle
var k3 = require('lodash').forEach

let set1 = new Set([k1, k2])

let set = new Set([...set1, k3, k2])

console.log('size', set.size)
console.log('values', set.values())
console.log('keys', set.keys())
console.log('entries', set.entries())
