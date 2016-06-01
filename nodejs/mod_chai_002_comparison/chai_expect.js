#!/usr/bin/env node
'use strict';

console.log('Hello world !');

const expect = require('chai').expect
const sinon = require('sinon')
require('chai').use(require('sinon-chai'))

describe('chai.expect', function() {

	it('should allow asserting - true', () => {
		expect([1,2,3].indexOf(5) === 333).to.be.true
	})
	it('should allow asserting - false', () => {
		expect([1,2,3].indexOf(5) === -1).to.be.false
	})
	it('should allow asserting - truthy', () => {
		expect('').to.be.ok
	})

	it('should allow asserting equality - expressions', () => {
		expect([1,2,3].indexOf(5)).to.equal(333)
	})
	it('should allow asserting equality - strings', () => {
		expect('abc').to.equal('abd')
	})
	it('should allow asserting equality - objects', () => {
		expect({ foo: 5 }).to.deep.equal({ bar: 6 })
	})
	it('should allow asserting equality - objects 2', () => {
		expect({ foo: { bar: 5 }}).to.deep.equal({ foo: { bar: 6 }})
	})

	it('should allow asserting a property - presence', () => {
		const vut = { foo: 5 }
		expect(vut).to.have.property('bar')
	})
	it('should allow asserting a property - value, case 1', () => {
		const vut = { foo: 5 }
		expect(vut).to.have.property('bar', 42)
	})
	it('should allow asserting a property - value, case 2', () => {
		const vut = { foo: 5 }
		expect(vut).to.have.property('foo', 42)
	})

	it('should allow asserting a deep property - presence', () => {
		const vut = { content: { entry: [ 1, 2, 5 ] }}
		expect(vut).to.have.deep.property('content.entries[2]', 3)
	})
	it('should allow asserting a deep property - value', () => {
		const vut = { content: { entries: [ 1, 2, 5 ] }}
		expect(vut).to.have.deep.property('content.entries[2]', 3)
	})

	it('should allow asserting a string - inclusion', () => {
		const msg = 'Made undefined billing admin'
		expect(msg).to.include('John')
	})

	it('should allow asserting a value from a set', () => {
		const allowed_levels = ['info', 'warn', 'error']
		const vut = 'critical'
		expect(vut).to.be.oneOf(allowed_levels)
	})

	it('should allow asserting a length', () => {
		const vut = [ 1, 3 ]
		expect(vut).to.have.lengthOf(3)
	})

	it('should allow asserting a spy call count', () => {
		const some_spy = sinon.spy()
		expect(some_spy).to.have.been.calledOnce()
	})
	it('should allow asserting a spy call param', () => {
		const some_spy = sinon.spy()
		some_spy('foo')
		some_spy('baz')
		expect(some_spy).to.have.been.calledWith('bar')
	})

})
