if (typeof define !== 'function') { var define = require('amdefine')(module) }

define(
[
	'offirmo/user_society/person'
],
function(Person) {
	"use strict";

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
