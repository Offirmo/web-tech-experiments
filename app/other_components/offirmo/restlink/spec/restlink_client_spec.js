"use strict";
if (typeof define !== 'function') { var define = require('amdefine')(module) }

define(
[
	'chai',
	'underscore',
	'backbone',
	'offirmo/restlink/restlink_client',
	'offirmo/base/base_object',
	'jquery',
	'offirmo/restlink/response'
],
function(chai, _, Backbone, CUT, BaseObject, jQuery, Response) {

	var expect = chai.expect;
	chai.should();

	var test_adapter = {
		process_request: function(request) {
			var result_deferred = jQuery.Deferred();
			var result_promise = result_deferred.promise(); // the object we'll return

			// this is a test, build a response
			var response = Response.make_new_from_request(request, {
				return_code: Response.constants.http_code.status_200_ok,
				content: {
					attr1: 34,
					attr2: [ 'jquery' ],
					attr3: { code: 222 }
				}
			});
			result_deferred.resolve(response);

			return result_promise;
		}
	};

	var TestModel = BaseObject.extend({

		defaults: function(){
			var this_class_defaults = {
				url: 'testobject', //< (backbone) url fragment for this object

				attr1: 12,
				attr2: [ 'chai', 'underscore' ],
				attr3: { code: 543 }
			};

			// merge with parent's defaults if needed
			var parent_defaults = new BaseObject().attributes;
			var defaults = _.defaults(this_class_defaults, parent_defaults);

			return defaults;
		}
	});

	describe('restlink_client', function() {

		describe('instantiation', function() {

			it('should be instantiable', function() {
				var out = CUT.make_new();
				out.should.exist;
				out.should.be.an('object');
			});

			it('should set default values', function() {
				var out = CUT.make_new();
				//out.get('denomination').should.exist.and.equal('Anonymous');
			});

		}); // describe feature

		describe('GET', function() {

			it('should be able to create');

			it('should be able to read', function(done) {
				var out = CUT.make_new();
				out.set_restlink_adapter(test_adapter);

				var model = new TestModel();
				//console.log(model.toJSON() );
				//model.set_restlink_client(out);

				var promise = out.GET(model);
				promise.fail(function(){
					var success = false;
					success.should.be.true;
				});
				promise.done(function(){
					model.get('attr1').should.equal(34);
					model.get('attr2').should.deep.equal([ 'jquery' ]);
					model.get('attr3').should.deep.equal({ code: 222 });
					done();
				});
			});

			it('should be able to update');

			it('should be able to delete');

		}); // describe feature

	}); // describe CUT
}); // requirejs module
