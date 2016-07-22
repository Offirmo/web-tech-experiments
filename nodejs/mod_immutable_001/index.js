#!/usr/bin/env node
'use strict';
console.log('Hello world !')

// https://github.com/facebook/immutable-js
const Immutable = require('immutable')

var map1 = Immutable.Map({a:1, b:2, c:3})

var map2 = map1.set('b', 2)
console.log(map1.equals(map2)) // true

var map3 = map1.set('b', 50)
console.log(map1.equals(map3)) // false

console.log(map2.get('b')) // 2
console.log(map3.get('b')) // 50
