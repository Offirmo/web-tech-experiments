/* Offirmo App account
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


	function validate_email(attrs, options) {
		if(_.isUndefined(attrs.email)) {
			return 'Must have an email !';
		}
		if(!_.isString(attrs.email)) {
			return 'Email must be a string !';
		}
		// todo use validate.js
		if(attrs.email.length < 5) {
			return 'Email must be >= 5 !';
		}
		// return nothing
	}


	var ParentModel = BaseModel;
	var parentModel_reference_instance = new ParentModel;

	var DefinedModel = ParentModel.extend({

		defaults: function(){
			ParentModel.prototype.defaults.call(this);

			this.set({
				serialization_version: 1,

				email: undefined,
				x_pwd_hash: undefined
			});
		},

		initialize: function(){
			ParentModel.prototype.initialize.call(this);

			this.url = 'account'; //< (backbone) url fragment for this object
			this.add_validation_fn(validate_email);
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
