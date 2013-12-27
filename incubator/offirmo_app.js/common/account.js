/* Offirmo App account
 */
if (typeof define !== 'function') { var define = require('amdefine')(module); }

define(
[
	'underscore',
	'base-objects/backbone/base_model',
	'offirmo_app/common/identity'
],
function(_, BaseModel, Identity) {
	"use strict";

	var constants = {
		latest_serialization_version: 1
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
				serialization_version: constants.latest_serialization_version,

				email: undefined,

				sg_newly_created_account_credential : undefined, //< only exists briefly at account creation
				xsg_pwd_hash : undefined
			});
		},

		initialize: function(){
			ParentModel.prototype.initialize.call(this);

			this.url = 'account'; //< (backbone) url fragment for this object
			//this.add_validation_fn(validate_email);
		},

		create_identity: function(optional_attrs){
			var identity = Identity.make_new(optional_attrs);
			identity.set("sg_account_id", this.id); // defined or not

			return identity;
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
