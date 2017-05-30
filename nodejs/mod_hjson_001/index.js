#!/bin/sh
':' //# http://sambal.org/?p=1014 ; exec `dirname $0`/../../node_modules/.bin/babel-node "$0" "$@"
'use strict';

import * as fs from 'fs'

import * as hjson from 'hjson'

const content = fs.readFileSync('./test.hjson', {encoding: 'utf-8'})

const obj = hjson.parse(content)

console.log(obj)
