/* A restlink specially configured for nodejs tests
 */
"use strict";
if (typeof define !== 'function') { var define = require('amdefine')(module) }

define(
[
	'underscore',
	'offirmo/restlink/restlink'
],
function(_, RestLink) {

	var restlink = new RestLink();

	return restlink;
}); // requirejs module
