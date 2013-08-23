/* Example of Offirmo object
 * (for copy/paste new objects)
 */
if (typeof define !== 'function') { var define = require('amdefine')(module) }

define(
[
	'underscore',
	'offirmo/base/backbone/named_object'
],
function(_, NamedObject) {
	"use strict";

	var Constants = {
		// ...
	};

	var ParentModel = NamedObject;
	var parentModel_instance = new ParentModel;
	var ExampleObject = ParentModel.extend({

		defaults: function(){
			var this_class_defaults = {
				url: 'exampleobject' //< (backbone) url fragment for this object
			};

			// merge with parent's defaults if needed
			var parent_defaults = new ParentModel().attributes;
			var defaults = _.defaults(this_class_defaults, parent_defaults);

			// also merge with parent's constants
			defaults.constants = _.defaults(Constants, parentModel_instance.get('constants'));

			return defaults;
		},

		validate: function(attrs, options) {

			// in this case, we can reuse parent validation
			var parent_validation = (new ParentModel).validate(attrs, options);
			if(typeof parent_validation !== 'undefined') {
				return parent_validation;
			}

			// TODO own validation
		},

		sync: function(method, model, options)
		{
			options || (options = {});

			console.log("Backbone.ExampleObject.sync called : " + method, options);

			if(method === 'read') {
				throw 'ExampleObject sync update not implemented !';
			}
			else if(method === 'update') {
				throw 'ExampleObject sync update not implemented !';
			}
			else {
				throw 'ExampleObject sync ' + method + ' not supported !';
			}
		}

	});

	return ExampleObject;
}); // requirejs module
