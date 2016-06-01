#!/usr/bin/env node
'use strict';

console.log('Hello world !');

const assert = require('assert')
const sinon = require('sinon')

describe('assert', function () {

	it('should allow asserting - true', () => {
		assert.ok([1,2,3].indexOf(5) === 333)
	})
	it('should allow asserting - false', () => {
		assert.ok([1,2,3].indexOf(5) !== -1)
	})
	it('should allow asserting - truthy', () => {
		assert.ok('')
	})

	it('should allow asserting equality - expressions', () => {
		assert.strictEqual([1,2,3].indexOf(5), 333)
	})
	it('should allow asserting equality - strings', () => {
		assert.strictEqual('abc', 'abd')
	})
	it('should allow asserting equality - objects', () => {
		assert.deepEqual({ foo: 5 }, { bar: 6 })
	})
	it('should allow asserting equality - objects 2', () => {
		assert.deepEqual({ foo: { bar: 5 }}, { foo: { bar: 6 }})
	})

	it('should allow asserting a property - presence', () => {
		const vut = { foo: 5 }
		assert.ok(vut.bar)
	})
	it('should allow asserting a property - value, case 1', () => {
		const vut = { foo: 5 }
		assert.strictEqual(vut.bar, 42)
	})
	it('should allow asserting a property - value, case 2', () => {
		const vut = { foo: 5 }
		assert.strictEqual(vut.foo, 42)
	})

	it('should allow asserting a deep property - presence', () => {
		const vut = { content: { entry: [ 1, 2, 5 ] }}
		assert.strictEqual(vut.content.entries[2], 3)
	})
	it('should allow asserting a deep property - value', () => {
		const vut = { content: { entries: [ 1, 2, 5 ] }}
		assert.strictEqual(vut.content.entries[2], 3)
	})

	it('should allow asserting a string - inclusion', () => {
		const msg = 'Made undefined billing admin'
		assert.ok(msg.indexOf('John') !== -1)
	})

	it('should allow asserting a value from a set', () => {
		const allowed_levels = ['info', 'warn', 'error']
		const vut = 'critical'
		assert.ok(allowed_levels.indexOf(vut) !== -1)
	})

	it('should allow asserting a length', () => {
		const vut = [ 1, 3 ]
		assert.ok(vut.length === 3)
	})

	it('should allow asserting a spy call count', () => {
		const some_spy = sinon.spy()
		assert.strictEqual(some_spy.callCount, 1)
	})
	it('should allow asserting a spy call param', () => {
		const some_spy = sinon.spy()
		some_spy('foo')
		some_spy('baz')
		assert.ok(some_spy.calledWith('bar'))
	})

})
