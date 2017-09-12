#!/bin/sh
':' //# http://sambal.org/?p=1014 ; exec /usr/bin/env node "$0" "$@"
'use strict';

// https://nodejs.org/en/docs/es6/
// node --v8-options | grep "in progress"

console.log('Hello world !')

const prettyjson = require('prettyjson')


function poll_v1a(predicate, options) {
	const {periodMs, timeoutMs, debugId} = Object.assign({
		periodMs: 100, // check every 100ms
		timeoutMs: 10 * 1000,
		debugId: 'an unnamed predicate',
	}, options || {})

	console.log('--- poll1()\ninput:\n' + prettyjson.render(options || {}), '\noutput:\n' + prettyjson.render({periodMs, timeoutMs, debugId}))
}

function poll_v1(predicate, options) {
	const {periodMs, timeoutMs, debugId} = Object.assign({
		periodMs: 100, // check every 100ms
		timeoutMs: 10 * 1000,
		debugId: 'an unnamed predicate',
	}, options)

	console.log('--- poll1()\ninput:\n' + prettyjson.render(options || {}), '\noutput:\n' + prettyjson.render({periodMs, timeoutMs, debugId}))
}

function poll_v2(predicate, options = {}) {
	const {periodMs, timeoutMs, debugId} = Object.assign({
		periodMs: 100, // check every 100ms
		timeoutMs: 10 * 1000,
		debugId: 'an unnamed predicate',
	}, options)

	console.log('--- poll2()\ninput:\n' + prettyjson.render(options), '\noutput:\n' + prettyjson.render({periodMs, timeoutMs, debugId}))
}

function poll_v3(predicate, options = {}) {
	const {periodMs, timeoutMs, debugId} = {
		periodMs: 100, // check every 100ms
		timeoutMs: 10 * 1000,
		debugId: 'an unnamed predicate',
		...options
	}

	console.log('--- poll3()\ninput:\n' + prettyjson.render(options), '\noutput:\n' + prettyjson.render({periodMs, timeoutMs, debugId}))
}

function poll_v4(predicate, {periodMs = 100, timeoutMs = 10 * 1000, debugId = 'an unnamed predicate'} = {}) {
	console.log('--- poll4()\ninput: ?\noutput:\n' + prettyjson.render({periodMs, timeoutMs, debugId}))
}

poll_v1()
poll_v1(null, {debugId: 'foo', timeoutMs: 30 * 1000})

poll_v2()
poll_v2(null, {debugId: 'foo', timeoutMs: 30 * 1000})

poll_v3()
poll_v3(null, {debugId: 'foo', timeoutMs: 30 * 1000})

poll_v4()
poll_v4(null, {debugId: 'foo', timeoutMs: 30 * 1000})
