#!/bin/sh
':' //# http://sambal.org/?p=1014 ; exec `dirname $0`/../../node_modules/.bin/ts-node "$0" "$@"

// http://inversify.io/

console.log('hello')

import kernel from "./inversify.kernel";
import { TYPES, Mod1Schema, Mod1StaticData, Mod1Factory } from './types'

const schema = kernel.get<Mod1Schema>(TYPES.Mod1Schema)
console.log('Mod1 schema from kernel:', schema)

const sd = kernel.get<Mod1StaticData>(TYPES.Mod1StaticData)
console.log('Mod1 static data from kernel:', sd)

const mod1_factory = kernel.get<Mod1Factory>(TYPES.Mod1Factory)
console.log('Mod1 from kernel:', mod1_factory)

console.log('create a mod1 data:', mod1_factory().create(sd[0]))
