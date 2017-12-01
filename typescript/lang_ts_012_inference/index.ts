#!/bin/sh
':' //# http://sambal.org/?p=1014 ; exec `dirname $0`/../../node_modules/.bin/ts-node "$0" "$@"
console.log('Hello, typescript world !')

const isSame = <T>(one: T, two: T) => one === two;
isSame('hello', 1);
