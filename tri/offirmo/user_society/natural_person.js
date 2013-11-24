if (typeof define !== 'function') { var define = require('amdefine')(module); }

define(
[
	'offirmo/user_society/person'
],
function(Person) {
	"use strict";

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
