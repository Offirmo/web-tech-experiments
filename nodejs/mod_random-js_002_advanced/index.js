#!/bin/sh
':' //# http://sambal.org/?p=1014 ; exec `dirname $0`/../../node_modules/.bin/babel-node "$0" "$@"

console.log('Hello, world !')

import { Random } from 'random-js'

let engine

if (true) {
	const mersenne_twister_engine = Random.engines.mt19937()
	mersenne_twister_engine.seed(1234)
	//mersenne_twister_engine.autoSeed()
	engine = mersenne_twister_engine
}

for(let i = 0; i<10; ++i) {
	console.log('#' + i+1)
	console.log('- native:', engine())
	console.log('- integer[100…199]:', Random.integer(100, 199)(engine))
	console.log('- bool:', Random.bool()(engine))
	console.log('- 3 1-6 dices:', Random.dice(6, 3)(engine))
	console.log('- uuid4:', Random.uuid4(engine))
}
