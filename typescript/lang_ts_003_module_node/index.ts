#!/bin/sh
':' //# https://sambal.org/?p=1014 ; exec `dirname $0`/../../node_modules/.bin/ts-node "$0" "$@"

import _ = require('lodash')

console.log(_.toUpper('Hello, world !'))
