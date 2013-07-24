"use strict";

var chai = require('chai');
var expect = chai.expect;
chai.should();

describe('Account', function() {

	var CUT = require('../model/account');

	describe('instantiation', function() {

		it('should be instantiable', function() {
			var out = new CUT();

			out.should.exist;
			out.should.be.an('object');
		});

		it('should have correct inheritance', function() {

			var out = new CUT();

			out.should.be.an.instanceof(CUT);

			var Parent = require('../../base/model/named_object');
			out.should.be.an.instanceof(Parent);
		});

		it('should set default values', function() {
			var out = new CUT();
			//...
		});

	});

});

