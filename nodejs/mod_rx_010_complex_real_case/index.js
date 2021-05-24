#!/usr/bin/env node
'use strict';

console.log('Hello world !');

// https://github.com/ReactiveX/RxJS
// https://reactivex.io/rxjs/
// https://reactivex.io/rxjs/manual/overview.html
const Rx = require('rxjs')
const _ = require('lodash')

// beware, will instantiate the observable
const start = Date.now()
const pad = '000000'
const pad_size = 6
function log_observable(observable, id) {
	return observable.subscribe(
		x =>     console.log(`T=${(pad + (Date.now() - start)).slice(-pad_size)} [${id}] ..."${x.toString()}"`),
		err => console.error(`T=${(pad + (Date.now() - start)).slice(-pad_size)} [${id}] ...Error: "${err}" !`),
		() =>    console.log(`T=${(pad + (Date.now() - start)).slice(-pad_size)} [${id}] ...Completed.`)
	)
}

////////////////////////////////////

let FETCH_DELAY = 1000
let FRESH_DATA = 'fresh foo'
let CACHED_DATA = null

let test_case = 1
switch (test_case) {
	case 1:
		// cache available
		CACHED_DATA = 'cached foo'
		break

	case 2:
		// no cache yet
		break

	default:
		throw new Error('please select a test case !')
		break
}

////////////////////////////////////

const OPERATORS = {
	concat: Symbol('concat'),
	merge: Symbol('merge'),
	zip: Symbol('zip'),
}

function uniformize_stream_definition(raw_definition, id) {
	if (!_.isString(id) && !_.isSymbol(id)) throw new Error(`stream ids must be strings or symbols ! ("${typeof id}")`)

	let def

	if (_.isArray(raw_definition)) {
		// async style format, convert it
		def = {
			dependencies: raw_definition.slice(0, -1),
			generator: raw_definition.slice(-1)[0]
		}
	}
	else {
		// trivial async style format, convert it
		def = {
			dependencies: [],
			generator: raw_definition
		}
	}

	// uniformize task generator
	if (!def.generator) throw new Error(`stream definition "${id}" should have a generator !`)
	if (_.isFunction(def.generator)) def.generator = def.generator() // one call is allowed
	if (!def.generator) throw new Error(`stream definition ${id} generator function should return something !`)

	if (def.generator.then) {
		// it's a promise !
		if (def.dependencies.length) throw new Error(`stream ${id} is a direct promise but has dependencies !`)
		def.source = 'direct promise'
		def.promise = def.generator // remember the original promise
		def.observable = Rx.Observable.fromPromise(def.generator)
	}
	else if (def.generator.subscribe) {
		// it's an observable !
		if (def.dependencies.length) throw new Error(`stream ${id} is a direct observable but has dependencies !`)
		def.source = 'direct observable'
		def.observable = def.generator
	}
	else if (_.isSymbol(def.generator)) {
		switch(def.generator) {
			case OPERATORS.concat:
			case OPERATORS.merge:
			case OPERATORS.zip:
				if (!def.dependencies.length) throw new Error(`task ${id} operator should have dependencies !`)
				def.source = 'operator'
				break

			default:
				// not ours, consider it a direct sync value
				if (def.dependencies.length) throw new Error(`stream ${id} is a direct value but has dependencies !`)
				def.source = 'direct value'
				def.value = def.generator
				def.promise = Promise.resolve(def.generator)
				def.observable = Rx.Observable.of(def.generator)
				break
		}
	}
	else {
		// direct sync value
		if (def.dependencies.length) throw new Error(`stream ${id} is a direct value but has dependencies !`)
		def.source = 'direct value'
		def.value = def.generator
		def.promise = Promise.resolve(def.generator)
		def.observable = Rx.Observable.of(def.generator)
	}

	def = Object.assign({}, def, {
		id,
		resolved: false,
		subject: null,
	})

	return def
}

function resolve_stream_observable(stream_defs_by_id, stream_def) {
	const { id, generator, observable } = stream_def

	if (!observable) {
		switch(typeof generator) {
			case 'function':
				// TODO
				throw new Error('not implemented')
				break;

			case 'symbol':
				if (!stream_def.dependencies.length) throw new Error(`stream ${id} operator should have dependencies !`)

				switch (generator) {
					case OPERATORS.merge:
						stream_def.observable = Rx.Observable.merge(...stream_def.dependencies.map(id => stream_defs_by_id[id].observable))
						break

					default:
						throw new Error(`stream ${id}: unrecognized operator ! ${generator}`)
						break
				}
				break

			default:
				throw new Error(`stream ${id}: generator should be a symbol ! ("${typeof generator}")`)
				break
		}
	}

	stream_def.resolved = true
	stream_def.subject = stream_def.observable.multicast(new Rx.Subject()).refCount()
	console.log(`resolved stream "${stream_def.id}"`)
	log_observable(stream_def.subject, stream_def.id)
}

function resolve_streams(stream_defs_by_id, unresolved_stream_defs) {
	let resolved_count = 0
	const still_unresolved_stream_defs = []

	unresolved_stream_defs.forEach(stream_def => {
		const has_unresolved_deps = stream_def.dependencies.some(stream_id => !stream_defs_by_id[stream_id].resolved)

		if (!has_unresolved_deps) {
			resolved_count++
			resolve_stream_observable(stream_defs_by_id, stream_def)
		}
		else {
			still_unresolved_stream_defs.push(stream_def)
		}
	})

	return still_unresolved_stream_defs
}


function auto(stream_definitions) {
	const stream_defs_by_id = {}
	const stream_defs = []
	const subjects = {}

	// check and uniformize definitions...
	const stream_ids = Object.keys(stream_definitions)
	stream_ids.forEach(stream_id => {
		// uniformize definitions format
		const raw_definition = stream_definitions[stream_id]
		const standardized_definition = uniformize_stream_definition(raw_definition, stream_id)

		stream_defs_by_id[stream_id] = standardized_definition
		stream_defs.push(standardized_definition)
	})

	// resolve related streams
	let progress = true
	let iteration_count = 0
	const SAFETY_LIMIT = 25
	let unresolved_stream_defs = [].concat(stream_defs)
	while (unresolved_stream_defs.length && progress && iteration_count < SAFETY_LIMIT) {
		iteration_count++
		const still_unresolved_stream_defs = resolve_streams(stream_defs_by_id, unresolved_stream_defs)
		progress = still_unresolved_stream_defs.length < unresolved_stream_defs.length
		unresolved_stream_defs = still_unresolved_stream_defs
	}

	if (unresolved_stream_defs.length)
		throw new Error('deadlock resolving streams, please check dependencies !')

	stream_ids.forEach(stream_id => {
		subjects[stream_id] = stream_defs_by_id[stream_id].subject
	})

	return subjects
}

function fetch_data() {
	return new Promise((resolve, reject) => {
		console.log('observable rxo_fresh_content promise created !')
		setTimeout(() => {
			console.log('observable rxo_fresh_content : resolving (and completing)')
			resolve(FRESH_DATA)
		}, FETCH_DELAY)
	})
}

const subjects = auto({
	vault_id:    function get_vault_id() { return 'default'},
	cached_data: function get_cached_data() { return CACHED_DATA },
	fresh_data:  fetch_data,
	data:        [ 'cached_data', 'fresh_data', OPERATORS.merge ]
})

////////////////////////////////////

// actions
const sbs1 = subjects.fresh_data.subscribe(x => {
	// pretend we did it...
	console.info('updated cache with fresh data:', x)
	sbs1.unsubscribe();
})

// race ?
// test every cases: cache, no cache

setTimeout(() => console.log('artificial wait done'), 2000)

/*
var subject = new Rx.BehaviorSubject(0); // 0 is the initial value

subject.subscribe({
	next: (v) => console.log('observerA: ' + v)
});

subject.next(1);
subject.next(2);

subject.subscribe({
	next: (v) => console.log('observerB: ' + v)
});

subject.next(3);
*/
