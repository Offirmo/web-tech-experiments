#!/bin/sh
':' //# http://sambal.org/?p=1014 ; exec `dirname $0`/../../node_modules/.bin/ts-node "$0" "$@"

import Immutable = require('immutable')

console.log('Hello, world !')

var map1: Immutable.Map<string, number> = Immutable.Map({a:1, b:2, c:3})

var map2 = map1.set('b', 2)
console.log(map1.equals(map2)) // true

var map3 = map1.set('b', 50)
console.log(map1.equals(map3)) // false

console.log(map2.get('b')) // 2
console.log(map3.get('b')) // 50

