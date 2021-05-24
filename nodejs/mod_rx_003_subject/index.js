#!/usr/bin/env node
'use strict';

console.log('Hello world !')

// https://github.com/ReactiveX/RxJS
// https://reactivex.io/rxjs/
// https://reactivex.io/rxjs/manual/overview.html
const Rx = require('rxjs')

// beware, will instantiate the observable
function log_observable(observable, id) {
	return observable.subscribe(
		x => console.log(`[${id}] Next: ${x.toString()}`),
		err => console.error(`[${id}] Error: ${err}`),
		() => console.log(`[${id}] Completed`)
	)
}

////////////////////////////////////
// observables (REM = pure functions)

const rxo1 = Rx.Observable.create(observer => {
	console.log('observable instantiating...')
	setTimeout(() => {
		observer.next(100)
	}, 1000);
	setTimeout(() => {
		observer.next(200)
	}, 2000);
	setTimeout(() => {
		observer.next(300)
		observer.complete()
	}, 3000)
})

////////////////////////////////////

// subjects
const rxs1 = rxo1.multicast(new Rx.Subject()).refCount()

////////////////////////////////////

log_observable(rxs1, 'S1a')

setTimeout(() => {
	log_observable(rxs1, 'S1b')
}, 1500)
