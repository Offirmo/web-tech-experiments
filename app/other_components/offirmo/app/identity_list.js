/* list of all available identities *for an account*
 * Ex. John Smith (home), JohnTheRoxxor (gaming)
 */
if (typeof define !== 'function') { var define = require('amdefine')(module) }

define(
[
	'underscore',
	'backbone',
	'offirmo/app/identity',
	'offirmo/base/backbone/base_object'
],
function(_, Backbone, Identity, BaseObject) {
	"use strict";

	var InnerIdentityList = Backbone.Collection.extend({
		'model': Identity,
	});

	var ParentModel = BaseObject;
	var IdentityList = ParentModel.extend({

		defaults: function(){
			var this_class_defaults = {
				url: 'identities', //< (backbone) url fragment for this object
				serialization_version: 1,
				account_denomination: undefined,
				list: new InnerIdentityList
			};

			// merge with parent's defaults if needed
			var parent_defaults = new ParentModel().attributes;
			return _.defaults(this_class_defaults, parent_defaults);
		},

		sync: function(method, model, options)
		{
			options || (options = {});

			//console.log("Backbone.IdentityList.sync called : " + method, options);

			var account = model.get('account_denomination');
			if(!_.isString(account)) {
				throw 'IdentityList sync : list not linked to an account !';
			}

			if(method === 'read') {
				// reset and refill the collection
				this.reset();

				// TODO

				model.trigger('sync', model, undefined, options);
				return;
			}
			else if(method === 'update') {
				throw 'IdentityList sync update not implemented !';
			}
			else {
				throw 'IdentityList sync ' + method + ' not supported !';
			}
		}
	});

	return IdentityList;
}); // requirejs module
