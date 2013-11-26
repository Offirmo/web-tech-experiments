/* Offirmo App Logical Session
 */
if (typeof define !== 'function') { var define = require('amdefine')(module); }

define(
	[
		'underscore',
		'base-objects/backbone/base_object'
	],
	function(_, BaseModel) {
		"use strict";

		var constants = {
			// ...
		};
		Object.freeze(constants);


		var ParentModel = BaseModel;
		var parentModel_reference_instance = new ParentModel;

		var DefinedModel = ParentModel.extend({

			defaults: function(){
				ParentModel.prototype.defaults.call(this);

				this.set({
					serialization_version: 1,

					i18name: undefined,
					i18description: undefined,
					i18keywords: []
				});
			},

			initialize: function(){
				ParentModel.prototype.initialize.call(this);

				//this.add_validation_fn(...);
			}

		});

		// allow "class member" like access to constants
		DefinedModel.constants = constants;

		// generator
		DefinedModel.make_new = function() {
			return new DefinedModel()
		};

		return DefinedModel;
	}); // requirejs module
