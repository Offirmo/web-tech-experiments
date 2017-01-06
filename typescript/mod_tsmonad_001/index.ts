#!/bin/sh
':' //# http://sambal.org/?p=1014 ; exec `dirname $0`/../../node_modules/.bin/ts-node "$0" "$@"

console.log('Hello, world !')

import { Maybe } from 'tsmonad'

var turns_out_to_be_100 = Maybe.just(10)
.caseOf({
	just: n => n * n,
	nothing: () => -1
});

console.log(turns_out_to_be_100)
