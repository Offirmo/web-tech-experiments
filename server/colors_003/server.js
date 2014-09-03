#!/usr/bin/env node
'use strict';

console.log('Hello world !');

// TODO
var _ = require('lodash');

var chalk = require('chalk');

console.log('msg on stdout');
console.error('msg on stderr');

console.log(chalk.styles.blue.open);

console.log('msg on stdout');
console.error('msg on stderr');

console.error(chalk.styles.red.open);

console.log('msg on stdout');
console.error('msg on stderr');
