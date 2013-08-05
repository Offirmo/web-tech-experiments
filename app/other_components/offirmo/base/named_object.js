"use strict";
if (typeof define !== 'function') { var define = require('amdefine')(module) }

define(
[
	'underscore',
	'offirmo/base/base_object'
],
function(_, BaseObject) {

	var max_denomination_size = 70;
	var default_denomination = 'Anonymous';

	var ParentModel = BaseObject;
	var NamedObject = ParentModel.extend({

		defaults: function(){
			var this_class_defaults = {
				url: 'namedobject', //< (backbone) url fragment for this object
				denomination: default_denomination
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

			if (typeof attrs.denomination === 'undefined') {
				return 'Must have a denomination !';
			}
			if (attrs.denomination.length === 0) {
				return 'Must have a non-empty denomination !';
			}
			if (attrs.denomination === default_denomination) {
				return 'Must have a non-default denomination !';
			}
			if (attrs.denomination.length > max_denomination_size) {
				return 'Must have a denomination smaller than ' + max_denomination_size + ' chars !';
			}
		},

		compute_id: function() {
			return this.get('denomination'); // TODO normalize
		}

	});

	return NamedObject;
}); // requirejs module
