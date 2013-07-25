/* App
 * = an app that the user can use with the same account
 * Ex. google account -> google docs, gmail, youtube, etc.
 */
"use strict";
if (typeof define !== 'function') { var define = require('amdefine')(module) }

define(
[
	'offirmo/base/named_object'
],
function(NamedObject) {

	var App = NamedObject.extend({

	});

	return App;
});
