"use strict";
if (typeof define !== 'function') { var define = require('amdefine')(module) }

// use the "Simplified CommonJS Wrapper" syntax
define(function(require, exports, module)
{
	var Backbone = require('backbone');

	var max_denomination_size = 70;
	var default_denomination = 'Anonymous';

	var NamedObject = Backbone.Model.extend({

		validate: function(attrs, options) {
			if (attrs.denomination === undefined) {
				return 'Must have a denomination !';
			}
			if (attrs.denomination.length === 0) {
				return 'Must have a non-empty denomination !';
			}
			if (attrs.denomination == default_denomination) {
				return 'Must have a non-default denomination !';
			}
			if (attrs.denomination.length > max_denomination_size) {
				return 'Must have a denomination smaller than ' + max_denomination_size + ' chars !';
			}
		},

		defaults: {
			denomination: default_denomination
		}
	});

	return NamedObject;
});
