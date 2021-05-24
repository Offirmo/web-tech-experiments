#!/bin/sh
':' //# https://sambal.org/?p=1014 ; exec `dirname $0`/../../node_modules/.bin/ts-node "$0" "$@"
console.log('Hello, typescript world !')

// question is: are node typings included by default ?

// if node is active : setInterval returns a NodeJS.Timer
const interval_id: number = setInterval(() => { console.log('interval')}, 1000)

// process is a global var only in node environment
console.log('node version is:', process.version)

clearInterval(interval_id)
