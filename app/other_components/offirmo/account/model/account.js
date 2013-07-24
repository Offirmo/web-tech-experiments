/* Account
 * = account we log into, with email / password
 */
"use strict";
if (typeof define !== 'function') { var define = require('amdefine')(module) }


// use the "Simplified CommonJS Wrapper" syntax
define(function(require, exports, module)
{
	var NamedObject = require('../../base/model/named_object');

	var Account = NamedObject.extend({

	});

	return Account;
});
