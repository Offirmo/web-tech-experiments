/* A generic REST 'server' executing REST operations
 * transport agnostic : can run on server or in client
 */
if (typeof define !== 'function') { var define = require('amdefine')(module) }

define(
[
	'underscore',
	'backbone',
	'jquery',
	'offirmo/restlink/request',
	'offirmo/restlink/response'
],
function(_, Backbone, jQuery, Request, Response) {
	"use strict";

	var Constants = {
		// ...
	};

	var make_new_restlink_server = function() {
		return {
			constants: Constants,

			// TOREVIEW useful ? Should the server know its adapters ?
			server_adapters: [],

			// routes and their associated callbacks
			// let's use the convenient 'Router' from Backbone
			// TODO replace with optimized version ?
			router: new Backbone.Router(),

			////////////////////////////////////
			add_restlink_adapter: function(adapter) {
				this.server_adapters.push(adapter);
			},

			////////////////////////////////////
			add_route: function(route, callback) {

			}
		}; // new object
	}; // make_new


	var restlink_server = {
		'make_new': make_new_restlink_server
	};

	return restlink_server;
}); // requirejs module
