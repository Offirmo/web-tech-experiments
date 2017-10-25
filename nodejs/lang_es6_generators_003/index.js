#!/bin/sh
':' //# http://sambal.org/?p=1014 ; exec /usr/bin/env node "$0" "$@"
'use strict';

console.log('Hello world !')


// https://ponyfoo.com/articles/asynchronous-i-o-with-generators-and-promises
function* numberGenerator () {
	console.log('numberGenerator called', arguments)
	var x = yield 1;
	var y = yield x;
	var z = yield (y * 2);
}

const g = numberGenerator('foo', 42)
console.log(g.next(33))
// <- { done: false, value: 1 }
console.log(g.next(42))
// <- { done: false, value: 2 }
console.log(g.next('foo'))
// <- { done: true, value: 3 }
console.log(g.next())
// <- ?
