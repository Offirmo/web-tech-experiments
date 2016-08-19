#!/bin/sh
':' //# http://sambal.org/?p=1014 ; exec `dirname $0`/../../node_modules/.bin/ts-node "$0" "$@"

// http://inversify.io/

console.log('hello')

import kernel from "./inversify.kernel";
import TYPES, { IData } from './types'

//import TYPES from "./types";

const test = kernel.get<IData>(TYPES.IData)

console.log(test)

