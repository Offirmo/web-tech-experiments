if (typeof define !== 'function') { var define = require('amdefine')(module); }

define(
[
	'chai',
	'underscore',
	'backbone',

	'base-objects/backbone/extensible_model',

	'mocha'
],
function(chai, _, Backbone, CUT) {
	"use strict";

	var expect = chai.expect;
	//chai.should();
	chai.Assertion.includeStack = true; // defaults to false

	describe('IWHAB Dependency Injection", function() {

		describe('instantiation', function() {

			it('should be instantiable', function() {
				var out = CUT.make_new();
				out.should.exist;
				out.should.be.an('object');

				out.for('toto').set('titi', 2);
				out.from('toto').get('titi');
				out.from('toto').get('titi').fallback(1);
			});

			it('should have correct inheritance', function() {

				var out = new CUT();
				out.should.be.an.instanceof(CUT);
				out.should.be.an.instanceof(Backbone.Model);
			});

		});

		describe('defaults extension', function() {

			it('should allow easy addition and composition of defaults', function(){

				// 1st object
				var TestModel1 = CUT.extend();
				CUT.add_defaults(TestModel1.prototype, {
					foo: 'bar',
					toto: 'titi'
				});
				// function variant
				CUT.add_defaults(TestModel1.prototype, function() {
					return { toto: 'tata' };
				});

				// 2nd object inheriting from its parent
				var TestModel2 = TestModel1.extend();
				CUT.add_defaults(TestModel2.prototype, {
					foo: 'barz',
					hello: 'world !'
				});

				// testing here ensure that TestModel1.prototype
				// was not affected by setup of TestModel2
				var out1 = new TestModel1;
				out1.should.be.an.instanceof(TestModel1);
				out1.should.be.an.instanceof(CUT);
				out1.should.be.an.instanceof(Backbone.Model);
				out1.attributes.should.deep.equals({
					foo: 'bar',
					toto: 'tata'
				});

				var out2 = new TestModel2;
				out2.should.be.an.instanceof(TestModel2);
				out2.should.be.an.instanceof(TestModel1);
				out2.should.be.an.instanceof(CUT);
				out2.should.be.an.instanceof(Backbone.Model);
				out2.attributes.should.deep.equals({
					foo: 'barz',
					toto: 'tata',
					hello: 'world !'
				});
			});

		});

		describe('validation extension', function() {

			it('should allow easy addition of validation methods', function(){

				var calls = [];
				var validation_should_fail = false;

				function validation1() {
					calls.push(1);
					// return nothing
				}
				function validation2() {
					calls.push(2);
					if(validation_should_fail) {
						return "validation error from 2";
					}
					//return nothing
				}
				function validation3() {
					calls.push(3);
					if(validation_should_fail) {
						return "validation error from 3";
					}
					//return nothing
				}

				// 1st object
				var TestModel1 = CUT.extend();
				CUT.add_validation_fn(TestModel1.prototype, validation1);
				CUT.add_validation_fn(TestModel1.prototype, validation2);

				// 2nd object inheriting from its parent
				var TestModel2 = TestModel1.extend();
				CUT.add_validation_fn(TestModel2.prototype, validation3);


				// first it should work with no validation added
				var out0 = new CUT();
				var temp = out0.validate();
				calls.should.deep.equals( [] );
				expect( temp ).to.be.undefined;


				// testing here ensure that TestModel1.prototype
				// was not affected by setup of TestModel2
				var out1 = new TestModel1;
				temp = out1.validate();
				calls.should.deep.equals( [ 1, 2 ] );
				calls.length = 0;
				expect( temp ).to.be.undefined;

				var out2 = new TestModel2;
				temp = out2.validate();
				calls.should.deep.equals( [ 1, 2, 3 ] );
				expect( temp ).to.be.undefined;

				// now let's check errors
				calls.length = 0;
				validation_should_fail = true;
				temp = out2.validate();
				calls.should.deep.equals( [ 1, 2, 3 ] );
				temp.should.deep.equals( [ "validation error from 2", "validation error from 3" ] );
			});
		});



		describe('initialization extension', function() {

			it('should allow easy addition of initialization methods', function(){

				var calls = [];

				function initialization1() {
					this.one = 1;
					calls.push(1);
				}
				function initialization2() {
					this.two = 2;
					calls.push(2);
				}
				function initialization3() {
					this.three = 3;
					calls.push(3);
				}

				// 1st object
				var TestModel1 = CUT.extend();
				CUT.add_initialization_fn(TestModel1.prototype, initialization1);
				CUT.add_initialization_fn(TestModel1.prototype, initialization2);

				// 2nd object inheriting from its parent
				var TestModel2 = TestModel1.extend();
				CUT.add_initialization_fn(TestModel2.prototype, initialization3);


				// first it should work with no init added
				var out0 = new CUT();
				calls.should.deep.equals( [] );


				// testing here ensure that TestModel1.prototype
				// was not affected by setup of TestModel2
				var out1 = new TestModel1;
				out1.one.should.eq(1);
				out1.two.should.eq(2);
				expect( out1.three).to.be.undefined;
				calls.should.deep.equals( [ 1, 2 ] );
				calls.length = 0;

				var out2 = new TestModel2;
				out2.one.should.eq(1);
				out2.two.should.eq(2);
				out2.three.should.eq(3);
				calls.should.deep.equals( [ 1, 2, 3 ] );
				calls.length = 0;
			});
		});

	}); // describe CUT
}); // requirejs module
