#!/bin/sh
':' //# http://sambal.org/?p=1014 ; exec `dirname $0`/../../node_modules/.bin/ts-node "$0" "$@"

// http://inversify.io/
// https://github.com/inversify/InversifyJS/blob/master/wiki/value_injection.md

console.log('hello')

import kernel from "./inversify";
import * as Mod1 from './mod1/inversify'

const schema = kernel.get<Mod1.Schema>(Mod1.TYPES.Schema)
console.log('Mod1 schema from kernel:', schema)

const sd = kernel.get<Mod1.StaticData>(Mod1.TYPES.StaticData)
console.log('Mod1 static data from kernel:', sd)

const mod1_factory = kernel.get<Mod1.Factory>(Mod1.TYPES.Factory)
//console.log('Mod1 factory from kernel:', mod1_factory)

console.log('create a mod1 data:', mod1_factory().create(sd[0]))
