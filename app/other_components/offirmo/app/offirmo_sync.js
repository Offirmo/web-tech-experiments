/* Offirmo-style Backbone "sync" redefinition
 *
 */
if (typeof define !== 'function') { var define = require('amdefine')(module) }

define(
[
	'backbone',
	'store'
],
function(Backbone, store) {
	"use strict";

	/////// Redefines backbone REST sync method to adapt it to our case
	// first backup the original method
	var originalBackboneSync = Backbone.sync;

	// then define our replacement
	// (this is known and accepted technique)
	Backbone.sync = function(method, model, options)
	{
		options || (options = {});
		options.dataType = 'jsonp';

		/////// URL
		// REM : passing options.url will override
		// the default construction of the url in Backbone.sync
		var url = model.url;
		// first allow a collection to inherits it's model url segment
		// (why isn't it done by default ??)
		if( typeof(url) === "undefined" )
		{
			if( typeof(model.model) !== "undefined" )
			{
				url = model.model.url;
			}
		}

		console.log("Backbone.sync called : " + method + " on " + model);

		// eventually, forward to the original method
		//return originalBackboneSync.call( this, method, model, options );

		return undefined;
	};

	return undefined;
});
