/* Session
 * singleton object representing the current session
 */
if (typeof define !== 'function') { var define = require('amdefine')(module) }

define(
[
	'underscore',
	'offirmo/base/backbone/base_object',
	'offirmo/app/app_list',
	'offirmo/app/account',
],
function(_, BaseObject, AppList, Account) {
	"use strict";

	var ParentModel = BaseObject;
	var Session = ParentModel.extend({

		defaults: function(){
			var this_class_defaults = {
				url: 'session', //< (backbone) url fragment for this object
				app_list: new AppList,
				current_app: undefined,
				current_account: new Account
			};

			// merge with parent's defaults if needed
			var parent_defaults = new ParentModel().attributes;
			return _.defaults(this_class_defaults, parent_defaults);
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

			console.log("Backbone.Session.sync called : " + method, options);

			if(method === 'read') {

				model.get('app_list').fetch(); // this one is statically fetched from code, so it always succeed (but up to date ?)

				model.get('current_account').fetch(); // more complicated

				model.set('current_app', AppList.detect_current_app());

				model.trigger('sync', model, undefined, options);
				return;
			}
			else if(method === 'update') {
				throw 'AppList sync update not implemented !';
			}
			else {
				throw 'AppList sync ' + method + ' not supported !';
			}
		}
	});

	return Session;
});
