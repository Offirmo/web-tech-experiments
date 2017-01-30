#!/usr/bin/env node
'use strict';

console.log('Hello world !')

// https://github.com/ReactiveX/RxJS
// http://reactivex.io/rxjs/
// http://reactivex.io/rxjs/manual/overview.html
const Rx = require('rxjs')

// beware, will instantiate the observable
const start = Date.now()
function log_observable(observable, id) {
	return observable.subscribe(
		x => console.log(`${Date.now() - start} [${id}] Next: ${x.toString()}`),
		err => console.error(`${Date.now() - start} [${id}] Error: ${err}`),
		() => console.log(`${Date.now() - start} [${id}] Completed`)
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
// Note the use of behaviour !
const rxs1 = rxo1.multicast(new Rx.BehaviorSubject(1)).refCount()

////////////////////////////////////

log_observable(rxs1, 'BehavS1a')

setTimeout(() => {
	log_observable(rxs1, 'BehavS1b')
}, 1500)
