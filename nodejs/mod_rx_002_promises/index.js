#!/usr/bin/env node
'use strict';

console.log('Hello world !');

// https://github.com/ReactiveX/RxJS
// http://reactivex.io/rxjs/
// http://reactivex.io/rxjs/manual/tutorial.html
const Rx = require('rxjs')


// From a Promise
const p1 = Rx.Observable
	.fromPromise(new Promise((resolve, reject) => resolve('foo')))
p1.subscribe(
	value => console.log(value)
)

const p2 = Rx.Observable
	.fromPromise(new Promise((resolve, reject) => reject(new Error('bar'))))
p2.subscribe({
	next: value => console.log(value),
	error: err => console.error(err),
	complete: () => console.log('Observer got a complete notification'),
})

Rx.Observable
	.concat(p1, p2)
	.subscribe(value => console.log(value))
