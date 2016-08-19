/// <reference path="../../node_modules/@types/node/index.d.ts" />

import { Kernel, interfaces } from "inversify"

import TYPES, { IData } from './types'

const data: IData = require('./data.json')

var kernel = new Kernel()

kernel.bind<IData>(TYPES.IData).toConstantValue(data)

/*
kernel.bind<interfaces.Provider<IData>>("Provider<IData>")
	.toProvider<IData>((context: any) =>
		() => new Promise<IData>(resolve => resolve(data)))
*/

export default kernel
