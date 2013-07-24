"use strict";
if (typeof define !== 'function') { var define = require('amdefine')(module) }

// use the "Simplified CommonJS Wrapper" syntax
define(function(require, exports, module)
{
	var NamedObject = require('../../base/model/named_object');

	var Person = NamedObject.extend({

		is_natural: function() {
			throw "unknown at this stage !";
		},

		is_moral: function() {
			throw "unknown at this stage !";
		}
	});

	return Person;
});
