#!/bin/sh
':' //# https://sambal.org/?p=1014 ; exec /usr/bin/env node "$0" "$@"
'use strict';

console.log('Hello world !')


// https://ponyfoo.com/articles/asynchronous-i-o-with-generators-and-promises
function* numberGenerator () {
	console.log('numberGenerator called', arguments)
	yield* ['a', 'b', 'c']
}

const g = numberGenerator('foo', 42)
console.log(g.next())
// <- { done: false, value: 1 }
console.log(g.next())
// <- { done: false, value: 2 }
console.log(g.next())
// <- { done: true, value: 3 }
console.log(g.next())
// <- ?
