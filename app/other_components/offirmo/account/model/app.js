/* App
 * = an app that the user can use with the same account
 * Ex. google account -> google docs, gmail, youtube, etc.
 */
"use strict";
if (typeof define !== 'function') { var define = require('amdefine')(module) }


// use the "Simplified CommonJS Wrapper" syntax
define(function(require, exports, module)
{
	var NamedObject = require('../../base/model/named_object');

	var App = NamedObject.extend({

	});

	return App;
});
