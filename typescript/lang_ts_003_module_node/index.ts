#!/bin/sh
':' //# http://sambal.org/?p=1014 ; exec `dirname $0`/../../node_modules/.bin/ts-node "$0" "$@"

import * as _ from 'lodash'

console.log(_.toUpper('Hello, world !'))
