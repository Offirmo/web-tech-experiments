#!/usr/bin/env node
'use strict';

console.log('Hello world !')

// https://github.com/ReactiveX/RxJS
// http://reactivex.io/rxjs/
// http://reactivex.io/rxjs/manual/tutorial.html
const Rx = require('rxjs')


// beware, will instantiate the observable
function log_observable(observable, id) {
	return observable.subscribe(
		x => console.log(`[${id}] Next: ${x.toString()}`),
		err => console.error(`[${id}] Error: ${err}`),
		() => console.log(`[${id}] Completed`)
	)
}

// From a Promise
const rxo1 = Rx.Observable
	.fromPromise(new Promise((resolve, reject) => {
		console.log('rxo1 promise created !')
		resolve('foo')
	}))
log_observable(rxo1, 'O1a')
log_observable(rxo1, 'O1b')

const rxo2 = Rx.Observable
	.fromPromise(new Promise((resolve, reject) => reject(new Error('bar'))))
log_observable(rxo2, 'O2')

const rxo3 = Rx.Observable.concat(rxo1, rxo2)
log_observable(rxo3, 'O3')
