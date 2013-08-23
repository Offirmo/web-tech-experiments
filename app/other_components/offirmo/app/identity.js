/* Identity
 * = one of the identity the user can have under the same account
 * very useful for privacy
 * ex. two separate mail boxes under the same account, one for real life (John Smith), one for gaming (JohnTheRoxxor)
 */
if (typeof define !== 'function') { var define = require('amdefine')(module) }

define(
[
	'underscore',
	'offirmo/base/backbone/named_object'
],
function(_, NamedObject) {
	"use strict";

	var ParentModel = NamedObject;
	var Identity = ParentModel.extend({

		defaults: function(){
			var this_class_defaults = {
				url: 'identity', //< (backbone) url fragment for this object
				account: undefined //< url fragment used in url to identify this app
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

	return Identity;
}); // requirejs module
