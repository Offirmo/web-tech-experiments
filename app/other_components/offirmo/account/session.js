/* Session
 * singleton object representing the current session
 */
"use strict";
if (typeof define !== 'function') { var define = require('amdefine')(module) }

define(
[
	'backbone'
],
function(Backbone) {

	var Session = Backbone.Model.extend({

	});

	return Session;
});
