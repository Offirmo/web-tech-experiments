/* Identity
 * = one of the identity the user can have under the same account
 * very useful for privacy
 * ex. two separate mail boxes under the same account, one for real life (John Smith), one for gaming (JohnTheRoxxor)
 */
"use strict";
if (typeof define !== 'function') { var define = require('amdefine')(module) }


// use the "Simplified CommonJS Wrapper" syntax
define(function(require, exports, module)
{
	var NamedObject = require('../../base/model/named_object');

	var Identity = NamedObject.extend({
		// TODO should link to an account
	});

	return Identity;
});
