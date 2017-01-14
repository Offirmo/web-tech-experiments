#!/usr/bin/env node
'use strict';

console.log('Hello world !');

// https://github.com/ReactiveX/RxJS
// http://reactivex.io/rxjs/
// http://reactivex.io/rxjs/manual/overview.html
const Rx = require('rxjs')

let test_case = 0
let FETCH_DELAY = 1000
let FRESH_DATA = 'fresh foo'
let CACHED_DATA = null
switch (test_case) {
	case 1:
		// cache available
		CACHED_DATA = 'cached foo'
		break
	default:
		// no cache yet
		break
}

////////////////////////////////////

// observables (REM = pure functions)
const rxo_fresh_content = Rx.Observable
	.fromPromise(new Promise((resolve, reject) => {
		console.log('observable rxo_fresh_content created !')
		setTimeout(() => {
			console.log('observable rxo_fresh_content : resolving (and completing)')
			resolve('fresh foo')
		}, 1000)
	}))

const rxo_cached_content = Rx.Observable
	.of('cached foo')

////////////////////////////////////

// subjects
const rxs_fresh_content = rxo_fresh_content.multicast(new Rx.Subject()).refCount()

const rxs_cached_content = rxo_fresh_content.multicast(new Rx.Subject()).refCount()

////////////////////////////////////

// actions
const sbs1 = rxs_fresh_content.subscribe(x => {
	// pretend we did it...
	console.info('updated cache with fresh data:', x)
	sbs1.unsubscribe();
})

// race ?
// test every cases: cache, no cache

setTimeout(() => console.log('artificial wait done'), 2000)
