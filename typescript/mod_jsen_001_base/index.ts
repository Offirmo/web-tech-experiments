#!/bin/sh
':' //# http://sambal.org/?p=1014 ; exec `dirname $0`/../../node_modules/.bin/ts-node "$0" "$@"

import * as jsen from 'jsen'

console.log('Hello, world !')

const is_schema_valid = jsen({ '$ref': 'http://json-schema.org/draft-04/schema#' })({
	foo: 'bar'
})
if (!is_schema_valid) throw new Error('schema is invalid !')
