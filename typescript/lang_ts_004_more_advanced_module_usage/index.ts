#!/bin/sh
':' //# https://sambal.org/?p=1014 ; exec `dirname $0`/../../node_modules/.bin/ts-node "$0" "$@"

import hello from './lib'

hello('typescript world')
