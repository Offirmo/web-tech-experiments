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

// From one or multiple values
const rxo1 = Rx.Observable.of('foo', 'bar')
log_observable(rxo1, 'rxo1')

// From array of values
const rxo2 = Rx.Observable.from([1,2,3])
log_observable(rxo2, 'rxo2')
