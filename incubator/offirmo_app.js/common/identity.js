/* Offirmo App Identity
 * Identity are tied to a user and an app
 * A user may have multiple identities
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
		latest_serialization_version: 1
	};
	Object.freeze(constants);


	var ParentModel = BaseModel;
	var parentModel_reference_instance = new ParentModel;

	function validate(attrs, options) {

		// return nothing
	}

	var DefinedModel = ParentModel.extend({

		defaults: function(){
			ParentModel.prototype.defaults.call(this);

			this.set({
				serialization_version: constants.latest_serialization_version,

				sg_account_id : undefined, //< related account. MUST be present on server side
				username      : "You",     //< Username. Can be anything : "John", "John Smith", "__John Roxxor__"
				                           // Don't have to be unique, can be changed
				                           // todo i18n for the default value
				sg_differentiator : undefined, //< number to add to be unique (ex. "John Smith 1" and "John Smith 2")
				                               // must be computed by the server, so undefined at start
				avatar_url        : 'anonymous.png', // todo improve
				enabled_apps      : []  // apps for whom this identity is enabled
			});
		},

		initialize: function(){
			ParentModel.prototype.initialize.call(this);

			this.url = 'identity'; //< (backbone) url fragment for this object
			this.add_validation_fn(validate);
		},

		get_denomination: function() {
			return this.attributes.username;
		},

		get_unique_denomination: function() {
			return this.attributes.username + (this.attributes.differentiator ? (" " + this.attributes.differentiator) : "");
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
