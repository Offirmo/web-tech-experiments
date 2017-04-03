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


const rxo1 = Rx.Observable.create(observer => {
	console.log('observable instantiating...')

	setTimeout(() => {
		observer.next(100)
	}, 1000);

	setTimeout(() => {
		observer.error(new Error('err 1 !'))
	}, 2000);
	setTimeout(() => {
		observer.error(new Error('err 2 !'))
		observer.complete()
	}, 3000)
})

log_observable(rxo1, 'rxo1')
