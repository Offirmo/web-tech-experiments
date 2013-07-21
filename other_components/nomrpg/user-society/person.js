

"use strict";

// use the "Simplified CommonJS Wrapper" syntax
define(function(require, exports, module)
{
	var Backbone = require('backbone');
	require('backbone-associations');

	var Person = Backbone.Model.extend({
		is_natural: function() {

		},
		is_moral: function() {

		},
		defaults: {
			denomination: "",
			name : ""
		}
	});
});

