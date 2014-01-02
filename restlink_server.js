"use strict";


if (typeof define !== 'function') { var define = require('amdefine')(module); }

define(
[
	'restlink/server/restlink_server',
	'base-objects/backbone/base_model'
],
function(RestlinkServer, BaseModel) {
	"use strict";

	var TestModel = BaseModel.extend({

		defaults: function(){
			var this_class_defaults = {
				url: 'testobject', //< (backbone) url fragment for this object

				attr1: 12,
				attr2: [ 'chai', 'underscore' ],
				attr3: { code: 543 }
			};

			// merge with parent's defaults if needed
			var parent_defaults = new BaseObject().attributes;
			var defaults = _.defaults(this_class_defaults, parent_defaults);

			return defaults;
		}
	});


	// create a restlink server
	var restlink_server = RestlinkServer.make_new();

	// give it a name for debug
	restlink_server.set_denomination("test01");

	// add adapters

	// add handlers
	var teapot_BREW_callback = function(context, req, res) {
		res.with_status(400)
				.with_content("I'm a teapot !");

		res.send();
	};

	restlink_server.on("/stanford/teapot", "BREW", teapot_BREW_callback);

	// start the server
	restlink_server.startup();
}); // requirejs module
