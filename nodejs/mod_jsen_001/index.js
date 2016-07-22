#!/usr/bin/env node
'use strict';

console.log('Hello world !')

// https://github.com/bugventure/jsen
const jsen = require('jsen')

const validate = jsen({ type: 'string' })
console.log(validate('some value'))
console.log(validate(42))
