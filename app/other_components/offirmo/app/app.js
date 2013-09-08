/* App
 * = an app that the user can use with the same account
 * Ex. google account -> google docs, gmail, youtube, etc.
 */
if (typeof define !== 'function') { var define = require('amdefine')(module); }

define(
[
	'underscore',
	'offirmo/base/backbone/named_object'
],
function(_, NamedObject) {
	"use strict";

	var ParentModel = NamedObject;
	var App = ParentModel.extend({

		defaults: function(){
			var this_class_defaults = {
				denomination: 'Unnamed app',
				url: 'app' //< (backbone) url fragment for this object
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
		}

	});

	return App;
}); // requirejs module
