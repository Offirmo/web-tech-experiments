/// <reference path="../../../node_modules/inversify-dts/inversify/inversify.d.ts" />
/// <reference path="../../../node_modules/@types/node/index.d.ts" />

import { IModelCreationParams, ILib, factory } from './index'

type Schema = JSON
type StaticData = IModelCreationParams[]
type Factory = () => ILib

let TYPES = {
	Schema: Symbol('Schema'),
	StaticData: Symbol('StaticData'),
	Factory: Symbol('Factory'),
}

import { KernelModule, interfaces } from "inversify"

const default_schema: JSON = require('./schema.json')
const default_static_data: JSON = require('./static_data.json')

const kernel_module = new KernelModule((bind: interfaces.Bind) => {

	bind<Schema>(TYPES.Schema)
		.toConstantValue(default_schema as Schema)

	bind<StaticData>(TYPES.StaticData)
		.toConstantValue((default_static_data as any).content as StaticData)

	bind<interfaces.Factory<ILib>>(TYPES.Factory)
		.toFactory<ILib>((context: interfaces.Context) => {
			//console.log('in factory', context)
			return () => {
				//console.log('in factory func', arguments)
				return factory({
					schema: context.kernel.get<Schema>(TYPES.Schema)
				})
			}
		})

})

export {
	ILib,
	Schema,
	StaticData,
	Factory,
	TYPES,
	kernel_module
}
