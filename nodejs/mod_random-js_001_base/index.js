#!/bin/sh
':' //# http://sambal.org/?p=1014 ; exec `dirname $0`/../../node_modules/.bin/babel-node "$0" "$@"

console.log('Hello, world !')

//import { Random } from 'random-js'
import { Random } from '@offirmo/random'

console.log(Random)

const mersenne_twister_engine = Random.engines.mt19937()
//mersenne_twister_engine.seed(1234)
mersenne_twister_engine.autoSeed()

for(let i = 0; i<10; ++i) console.log(mersenne_twister_engine())

console.log('usage count: ' + mersenne_twister_engine.getUseCount())
