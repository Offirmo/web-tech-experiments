/* Offirmo App
 */
if (typeof define !== 'function') { var define = require('amdefine')(module); }

define(
[
	'underscore',
	'base-objects/backbone/base_model'
],
function(_, BaseModel) {
	"use strict";

	var constants = {
		latest_serialization_version: 1
	};
	Object.freeze(constants);


	var ParentModel = BaseModel;
	var parentModel_reference_instance = new ParentModel;

	var DefinedModel = ParentModel.extend({

		defaults: function(){
			ParentModel.prototype.defaults.call(this);

			this.set({
				serialization_version: constants.latest_serialization_version,

				i18_name: undefined,
				i18_description: undefined,
				i18_keywords: []
			});
		},

		initialize: function(){
			ParentModel.prototype.initialize.call(this);

			this.url = 'app'; //< (backbone) url fragment for this object
			//this.add_validation_fn(...);
		}

	});

	// allow "class member" like access to constants
	DefinedModel.constants = constants;

	// generator
	DefinedModel.make_new = function(optional_attrs) {
		return new DefinedModel(optional_attrs)
	};

	return DefinedModel;
}); // requirejs module
