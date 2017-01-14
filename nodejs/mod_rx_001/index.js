#!/usr/bin/env node
'use strict';

console.log('Hello world !');

// https://github.com/ReactiveX/RxJS
// http://reactivex.io/rxjs/
// http://reactivex.io/rxjs/manual/tutorial.html
const Rx = require('rxjs')

// From one or multiple values
Rx.Observable
	.of('foo', 'bar')
	.subscribe(value => console.log(value))

// From array of values
Rx.Observable
	.from([1,2,3])
	.subscribe(value => console.log(value))
