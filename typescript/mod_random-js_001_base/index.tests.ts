#!/bin/sh
':' //# https://sambal.org/?p=1014 ; exec `dirname $0`/../../node_modules/.bin/ts-node "$0" "$@"

console.log('Hello, world !')

//import 'random-js'

//import Random from 'random-js'
import { Random } from 'random-js'
//import * as _random from 'random-js'
//const random: Random = (_random as any as Random)

//import * as Random from 'random-js'
//import * as _Random from 'random-js'
//const Random: random.Random = _Random as any as random.Random
//console.log(random.Random)

console.log(Random)
console.log(Random.engines)

//const random = new Random()

/*
const mersenne_twister_engine = Random.engines.mt19937()
//mersenne_twister_engine.seed(1234)
mersenne_twister_engine.autoSeed()

for(let i = 0; i<10; ++i) console.log(mersenne_twister_engine())

console.log('usage count: ' + mersenne_twister_engine.getUseCount())

*/
