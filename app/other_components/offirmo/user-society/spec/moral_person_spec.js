"use strict";

var chai = require('chai');
var expect = chai.expect;
chai.should();

describe('MoralPerson', function() {

	var CUT = require('../model/moral_person.js');

	describe('instantiation', function() {

		it('should be instantiable', function() {
			var person = new CUT();

			person.should.exist;
			person.should.be.an('object');
		});

		it('should have correct inheritance', function() {

			var person = new CUT();

			person.should.be.an.instanceof(CUT);

			var Person = require('../model/person.js');
			person.should.be.an.instanceof(Person);
		});

		it('should set default values', function() {
			var person = new CUT();
			//...
		});

	});

	describe('naturalness', function() {

		it('should be false', function() {
			var person = new CUT();
			person.is_natural().should.be.false;
		});

	});

	describe('moralness', function() {

		it('should be true', function() {
			var person = new CUT();
			person.is_moral().should.be.true;
		});

	});
});
