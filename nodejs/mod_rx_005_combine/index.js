#!/usr/bin/env node
'use strict';

console.log('Hello world !')

// https://github.com/ReactiveX/RxJS
// https://reactivex.io/rxjs/
// https://reactivex.io/rxjs/manual/overview.html
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

const rxo1 = Rx.Observable
.of('Sfoo')
log_observable(rxo1, 'O1')

const rxo2 = Rx.Observable
.fromPromise(new Promise((resolve, reject) => resolve('Pfoo')))
//.fromPromise(new Promise((resolve, reject) => setTimeout(() => reject(new Error('bar')), 1500)))
log_observable(rxo2, 'O2')

const rxo3 = Rx.Observable.create(observer => {
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
log_observable(rxo3, 'O3')

////////////////////////////////////

const rxo_comb = Rx.Observable.combineLatest(rxo1, rxo2, rxo3)
log_observable(rxo_comb, 'rxo_comb')

const rxo_zip = Rx.Observable.zip(rxo1, rxo2, rxo3)
log_observable(rxo_zip, 'rxo_zip')
