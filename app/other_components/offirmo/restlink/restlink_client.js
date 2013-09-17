/* A client for executing REST operations on Backbone models
 * on a 'generic' server (distant or local)
 * with an integrated cache
 */
if (typeof define !== 'function') { var define = require('amdefine')(module); }

define(
[
	'underscore',
	'jquery',
	'offirmo/restlink/cache',
	'offirmo/restlink/request',
	'offirmo/restlink/response'
],
function(_, jQuery, cache, Request, Response) {
	"use strict";

	var constants = {
		// ...
	};

	function compute_key_from_url(url) {
		return 'offirmo_object:' + url;
	}

	function compute_meta_key_from_url(url) {
		return 'offirmo_object:' + url + ':meta';
	}

	function is_connected() {
		// TODO one day
		return false;
	}

	////////////////////////////////////
	var GET_intelligently_from_cache_or_server = function(client_adapter, model, options){

		// do we really need to query the server ?
		if(options.disable_cache){
			// yes, from server
			return GET_from_server_only(client_adapter, model, options);
		}
		else if(model.get('cache_strategy') === model.get('constants').cache_strategy_always_in_sync)
		{
			// no cache allowed for this one
			return GET_from_server_only(client_adapter, model, options);
		}
		else
		{
			return GET_from_cache_with_fallback_to_server(client_adapter, model, options);
		}
	};

	////////////////////////////////////
	var GET_from_cache_with_fallback_to_server = function(client_adapter, model, options) {
		// caching seems to be allowed for this object
		// check cache status for this object
		var storage_meta_key = compute_meta_key_from_url(model.compute_url());
		//console.log('storage_meta_key = ' + storage_meta_key);

		var meta_infos = cache.get(storage_meta_key);
		if(!meta_infos) {
			// nothing in cache
			return GET_from_server_only(client_adapter, model, options);
		}
		else {
			// cache up to date ?
			// TODO date comparison
			var cache_ok = false; // TODO
			if(cache_ok) {
				return GET_from_cache_only(model, options);
			}
			else {
				return GET_from_server_only(client_adapter, model, options);
			}
		}
	};

	////////////////////////////////////
	var GET_from_server_only = function(client_adapter, model, options) {

		var request = Request.make_new();

		request.method = 'GET';
		request.url = model.compute_url();

		var server_request_promise = client_adapter.process_request(request);
		model.trigger("request", model, server_request_promise, options); // try to respect Backbone API

		(function(model, options) {
			server_request_promise.then(
			// done
			function(response) {
				// call successful
				model.set(response.content);
				model.trigger('sync', model, response.content, options); // try to respect Backbone API
			},
			// fail
			function(response) {
				// TODO
				throw 'server request nok : not implemented';
			},
			// progress
			function(response) {
				// TODO
				//console.log('restlink server request progress :' + response);
			});
		})(model, options);


		return server_request_promise;
	};

	////////////////////////////////////
	var GET_from_cache_only = function(model, options) {
		throw 'GET_from_cache_only not implemented';
	};

	var make_new_restlink_client = function() {
		return {
			constants: constants,

			client_adapter: undefined,

			////////////////////////////////////
			set_restlink_adapter: function(adapter) {
				this.client_adapter = adapter;
			},
			////////////////////////////////////
			GET: function(model, options) {
				options || (options = {});

				_.defaults(options, {
					disable_cache: false, // cache enabled by default and unless specifed otherwise in the object itself
					force_server_request: false // server request not mandatory unless specified otherwise in the object itself
				});

				// do we really need to fetch at all ?
				if(!options.force_server_request && !model.really_needs_refresh()){
					// this object is already considered valid, no need to query the server nor the cache
					// TODO store a copy in the cache ? Already in the cache ?
					var result_deferred = jQuery.Deferred();
					var result_promise = result_deferred.promise(); // the object we'll return
					result_deferred.resolve(); // ok
					return result_promise;
				}

				// forward to another
				return GET_intelligently_from_cache_or_server(this.client_adapter, model, options);
			},

			PUT: function(model){
				throw 'PUT not implemented';
			},

			POST: function(model){
				throw 'POST not implemented';
			},

			DELETE: function(model){
				throw 'DELETE not implemented';
			}
		}; // new object
	}; // make_new


	return {
		'make_new': make_new_restlink_client
	};
}); // requirejs module
