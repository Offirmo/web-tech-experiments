/* Account
 * = account we log into, with email / password
 */
"use strict";
if (typeof define !== 'function') { var define = require('amdefine')(module) }

define(
[
	'underscore',
	'offirmo/base/named_object',
	'offirmo/app/identity_list',
	'restlink'
],
function(_, NamedObject, IdentityList, restlink) {

	var security_level_standard = 'standard';
	var security_level_high     = 'high';

	var ParentModel = NamedObject;
	var Account = ParentModel.extend({

		defaults: function(){
			var this_class_defaults = {
				url: 'account', //< (backbone) url fragment for this object
				security_level: security_level_standard,
				identities: new IdentityList
			};

			var parent_defaults = new ParentModel().attributes;

			// merge with parent's defaults if needed
			return _.defaults(this_class_defaults, parent_defaults);
		},

		sync: function(method, model, options)
		{
			options || (options = {});

			console.log("Backbone.Account.sync called : " + method, options);

			if(method === 'read') {
				return restlink.GET(model);
			}
			else if(method === 'update') {
				throw 'Account sync update not implemented !';
			}
			else {
				throw 'Account sync ' + method + ' not supported !';
			}
		}

	});

	return Account;
}); // requirejs module
