"use strict";
if (typeof define !== 'function') { var define = require('amdefine')(module) }

define(
[
	'chai',
	'underscore',
	'backbone',
	'offirmo/restlink/restlink',
	'offirmo/base/base_object'
],
function(chai, _, Backbone, CUT, BaseObject) {

	var expect = chai.expect;
	chai.should();

	var TestModel = BaseObject.extend({

		defaults: function(){
			var this_class_defaults = {
				url: 'testobject' //< (backbone) url fragment for this object
			};

			// merge with parent's defaults if needed
			var parent_defaults = new BaseObject().attributes;
			var defaults = _.defaults(this_class_defaults, parent_defaults);

			return defaults;
		}
	});

	describe('restlink', function() {

		describe('instantiation', function() {

			it('should be instantiable', function() {
				var out = new CUT();
				out.should.exist;
				out.should.be.an('object');
			});

			it('should set default values', function() {
				var out = new CUT();
				//out.get('denomination').should.exist.and.equal('Anonymous');
			});

		}); // describe feature

		describe('GET', function() {

			it('should be able to create');

			it('should be able to read', function(done) {
				var out = new CUT();
				var model = new TestModel();

				var promise = out.GET(model);
				promise.fail(function(){
					var success = false;
					success.should.be.true;
				});
				promise.done(function(){
					done();
				});
			});

			it('should be able to update');

			it('should be able to delete');

		}); // describe feature

	}); // describe CUT
}); // requirejs module
