#!/bin/sh
':' //# http://sambal.org/?p=1014 ; exec /usr/bin/env node "$0" "$@"
'use strict';

console.log('Hello world !')


// https://ponyfoo.com/articles/asynchronous-i-o-with-generators-and-promises
function* numberGenerator () {
	console.log('numberGenerator called', arguments)
	yield 1
	console.log('after 1')
	yield 2
	return 3 // 3 will never be seen
	yield 4 // will never be seen
}

const g = numberGenerator(1, 2)
console.log(g.next())
// <- { done: false, value: 1 }
console.log(g.next())
// <- { done: false, value: 2 }
console.log(g.next())
// <- { done: true, value: 3 }
console.log(g.next())
// <- ?
