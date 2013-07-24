"use strict";
if (typeof define !== 'function') { var define = require('amdefine')(module) }

// use the "Simplified CommonJS Wrapper" syntax
define(function(require, exports, module)
{
	var Person = require('./person');

	var NaturalPerson = Person.extend({

		is_natural: function() {
			return true;
		},

		is_moral: function() {
			return false;
		}
	});

	return NaturalPerson;
});
