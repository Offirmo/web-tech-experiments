"use strict";
if (typeof define !== 'function') { var define = require('amdefine')(module) }

// use the "Simplified CommonJS Wrapper" syntax
define(function(require, exports, module)
{
	var Person = require('./person');

	var MoralPerson = Person.extend({

		is_natural: function() {
			return false;
		},

		is_moral: function() {
			return true;
		}
	});

	return MoralPerson;
});
