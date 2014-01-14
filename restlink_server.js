"use strict";


if (typeof define !== 'function') { var define = require('amdefine')(module); }

define(
[
	'restlink/server',
	'restlink/server/adapters/http',
	'base-objects/backbone/base_model',
	'generic_store/generic_store',
	'base-objects/backbone/sync_to_store_mixin'
],
function(RestlinkServer, RestlinkHttpAdapter, BaseModel, GenericStore, SyncToStoreMixin) {
	"use strict";

	console.log("Hello world !");

// create a new augmented model
	var TestModel = BaseModel.extend({urlRoot: '/testobject'}); //< (backbone) url fragment for this object
	BaseModel.add_defaults(TestModel.prototype, {
		attr1: 12,
		attr2: [ 'chai', 'underscore' ],
		attr3: { code: 543 }
	});
	SyncToStoreMixin.mixin(TestModel.prototype);
	// set a model-wide store
	var store = GenericStore.make_new("memory");
	SyncToStoreMixin.set_model_store(TestModel.prototype, store);


	// create a restlink server
	var restlink_server = RestlinkServer.make_new();

	// add handlers
	var teapot_BREW_callback = function(context, req, res) {
		res.with_status(400)
				.with_content("I'm a teapot !");

		res.send();
	};

	restlink_server.on("/stanford/teapot", "BREW", teapot_BREW_callback);

	// ask restlink to serve it at the given uri
	restlink_server.serve_model_at('/api/v1.0', TestModel);

	// add adapters
	var http_adapter = RestlinkHttpAdapter.make_new();
	restlink_server.add_adapter( http_adapter );

	// give it a name for debug
	restlink_server.set_denomination("test01");

	// start the server
	restlink_server.startup();

}); // requirejs module
