/// <reference path="../../node_modules/@types/node/index.d.ts" />

import { Kernel, interfaces } from "inversify"

import * as Mod1 from './mod1'
import { TYPES, Mod1Schema, Mod1StaticData, Mod1Factory } from './types'

const mod1_schema: JSON = require('./mod1/schema.json')
const mod1_static_data: JSON = require('./mod1/static_data.json')

var kernel = new Kernel()

// https://github.com/inversify/InversifyJS/blob/master/wiki/value_injection.md
kernel
	.bind<Mod1StaticData>(TYPES.Mod1StaticData)
	.toConstantValue((mod1_static_data as any).content as Mod1StaticData)

kernel
	.bind<Mod1Schema>(TYPES.Mod1Schema)
	.toConstantValue(mod1_schema as Mod1Schema)

kernel
	.bind<interfaces.Factory<Mod1.ILib>>(TYPES.Mod1Factory)
	.toFactory<Mod1.ILib>((context: interfaces.Context) => {
		console.log('in factory', context)
		return () => {
			console.log('in factory func', arguments)
			return Mod1.factory({
				schema: context.kernel.get<Mod1Schema>(TYPES.Mod1Schema)
			})
		}
	})


export default kernel
