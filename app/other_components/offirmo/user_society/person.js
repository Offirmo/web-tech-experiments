if (typeof define !== 'function') { var define = require('amdefine')(module) }

define(
[
	'offirmo/base/named_object'
],
function(NamedObject) {
	"use strict";

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
