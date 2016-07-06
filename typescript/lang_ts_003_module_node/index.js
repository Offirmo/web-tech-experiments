#!/bin/sh
':'; //# http://sambal.org/?p=1014 ; exec `dirname $0`/../../node_modules/.bin/ts-node "$0" "$@"
"use strict";
var _ = require('lodash');
console.log(_.toUpper('Hello, world !'));
