if (typeof define !== 'function') { var define = require('amdefine')(module); }

define(
[
	'chai',
	'extended-exceptions',
	'mocha'
],
function(chai, EE) {
	"use strict";

	var expect = chai.expect;
	chai.should();

	describe('Extended exceptions', function() {

		describe('ExtendedError (base)', function() {

			/*it('test', function() {
				var out = new Error("Test error");
				out.should.exist;
				out.message.should.equals("Test error");
			});*/

			it('should inherit from Error', function() {
				var out = new EE.ExtendedError("Test error");
				out.should.exist;

				out.should.be.an('object');
				out.should.be.an.instanceof(Error);
				out.should.be.an.instanceof(EE.ExtendedError);
			});

			it('should behave like an Error', function() {
				var out = new EE.ExtendedError("Test error");

				out.name.should.equals("ExtendedError");
				out.message.should.equals("Test error");
				out.stack.should.not.be.empty;
			});

			it('should allow wrapping/retyping of an existing Error', function() {
				var base_err = new Error("Test error");
				var out = new EE.ExtendedError(base_err);

				out.name.should.equals("ExtendedError");
				out.message.should.equals("Test error");
				out.stack.should.not.be.empty;
				expect( out.stack ).to.equals(base_err.stack);
			});

			it('should work along chai expectations', function() {
				var tempfn = function() {throw new EE.IllegalState("Not started !"); };
				tempfn.should.throw(EE.IllegalState, "Not started !");
			});

		});

		var test_extended_error = function(CustomErrorClass, custom_error_name, ParentErrorClass) {
			var out = new CustomErrorClass("test_extended_error 1");
			out.should.exist;

			out.should.be.an.instanceof(CustomErrorClass);
			out.should.be.an.instanceof(ParentErrorClass);

			out.name.should.equals(custom_error_name);
			out.message.should.equals("test_extended_error 1");
			out.stack.should.not.be.empty;

			// should be throwable of course
			try {
				throw new CustomErrorClass("test_extended_error 2");
				expect(false).to.be.true;
			}
			catch(e) {
				e.should.be.an.instanceof(CustomErrorClass);
				e.message.should.equals("test_extended_error 2");
			}

			// and the chai assertion should work (even in FF ;)
			var tempfn = function() {
				throw new CustomErrorClass("test_extended_error 3");
			}
			tempfn.should.throw(CustomErrorClass, "test_extended_error 3");
		};


		describe('Custom errors creation', function() {
			it('should allow easy creation of a custom error which works', function() {
				var CustomError = EE.create_custom_error("CustomError", EE.RuntimeError);

				test_extended_error(CustomError, "CustomError", EE.RuntimeError );
			});
		}); // describe feature


		describe('predefined error', function() {
			describe('LogicError', function() {
				it('should work', function() {
					test_extended_error(EE.LogicError, "LogicError", EE.ExtendedError );
				});
			}); // describe feature

			describe('InvalidArgument', function() {
				it('should work', function() {
					test_extended_error(EE.InvalidArgument, "InvalidArgument", EE.LogicError );
				});
			}); // describe feature

			describe('LengthError', function() {
				it('should work', function() {
					test_extended_error(EE.LengthError, "LengthError", EE.LogicError );
				});
			}); // describe feature

			describe('OutOfRange', function() {
				it('should work', function() {
					test_extended_error(EE.OutOfRange, "OutOfRange", EE.LogicError );
				});
			}); // describe feature

			describe('RuntimeError', function() {
				it('should work', function() {
					test_extended_error(EE.RuntimeError, "RuntimeError", EE.ExtendedError );
				});
			}); // describe feature

			describe('NotImplemented', function() {
				it('should work', function() {
					test_extended_error(EE.NotImplemented, "NotImplemented", EE.RuntimeError );
				});
			}); // describe feature

			describe('UnknownEnumValue', function() {
				it('should work', function() {
					test_extended_error(EE.UnknownEnumValue, "UnknownEnumValue", EE.RuntimeError );
				});
			}); // describe feature

			describe('IllegalState', function() {
				it('should work', function() {
					test_extended_error(EE.IllegalState, "IllegalState", EE.RuntimeError );
				});
			}); // describe feature

			describe('InvariantNotMet', function() {
				it('should work', function() {
					test_extended_error(EE.InvariantNotMet, "InvariantNotMet", EE.LogicError );
				});
			}); // describe feature
		}); // describe feature
	});
});

