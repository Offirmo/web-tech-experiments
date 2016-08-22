/// <reference path="../../node_modules/inversify-dts/inversify/inversify.d.ts" />
import { Kernel, interfaces } from "inversify"

import * as Mod1 from './mod1/inversify'

const mod1_schema: JSON = require('./overrides/mod1_schema.json')

const default_kernel = new Kernel()
Mod1.bind(default_kernel)

const kernel = new Kernel();
kernel.parent = default_kernel

kernel
	.bind<Mod1.Schema>(Mod1.TYPES.Schema)
	.toConstantValue(mod1_schema as Mod1.Schema)

kernel
	.bind<Mod1.StaticData>(Mod1.TYPES.StaticData)
	.toConstantValue([ { name: 'OV Mod1 foo'}] as Mod1.StaticData)

export default kernel
