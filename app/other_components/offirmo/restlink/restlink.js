/* Example of Offirmo object
 * (for copy/paste new objects)
 */
"use strict";
if (typeof define !== 'function') { var define = require('amdefine')(module) }

define(
[
	'underscore',
	'backbone',
	'jquery',
	'store'
],
function(_, Backbone, jQuery, store) {

	var Constants = {
		// ...
	};

	var restlink = Backbone.Model.extend({

		defaults: function(){
			return {
				constants: Constants,
			};
		},

		compute_key_from_url: function(url){
			return 'offirmo_object:' + url;
		},

		compute_meta_key_from_url: function(url){
			return 'offirmo_object:' + url + ':meta';
		},

		is_connected: function(){
			// TODO one day
			return false;
		},

		////////////////////////////////////
		GET: function(model, options){
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
			return this.GET_intelligently_from_cache_or_server(model, options);
		},
		////////////////////////////////////
		GET_intelligently_from_cache_or_server: function(model, options){

			// do we really need to query the server ?
			if(options.disable_cache){
				// yes, from server
				return this.GET_from_server_only(model, options);
			}
			else if(model.get('cache_strategy') === model.get('constants').cache_strategy_always_in_sync)
			{
				// no cache allowed for this one
				return this.GET_from_server_only(model, options);
			}
			else
			{
				return this.GET_from_cache_with_fallback_to_server(model, options);
			}
		},
		////////////////////////////////////
		GET_from_cache_with_fallback_to_server: function(model, options) {
			// caching seems to be allowed for this object
			if(!store.enabled) {
				// well, no cache available...
				return this.GET_from_server_only(model, options);
			}
			else {
				// check cache status for this object
				var storage_meta_key = this.compute_meta_key_from_url(model.compute_url());
				console.log('storage_meta_key = ' + storage_meta_key);

				var meta_infos = store.get(storage_meta_key);
				if(!meta_infos) {
					// nothing in cache
					return this.GET_from_server_only(model, options);
				}
				else {
					// cache up to date ?
					// TODO date comparison
					var cache_ok = false; // TODO
					if(cache_ok) {
						return this.GET_from_cache_only(model, options);
					}
					else {
						return this.GET_from_server_only(model, options);
					}
				}
			}
		},
		////////////////////////////////////
		GET_from_server_only: function(model, options){

			var server_request_deferred = jQuery.Deferred();
			var server_request_promise = server_request_deferred.promise();

			// TOREVIEW
			if(this.is_connected()){
				// TODO
				server_request_deferred.reject(); // for now
			}
			else
			{
				// TODO wait if cnx in progress ?
				server_request_deferred.reject();
			}

			server_request_promise.then(
			// done
			function(status){
				throw 'server request ok : not implemented';
			},
			// fail
			function(status){
				throw 'server request nok : not implemented';
			},
			// progress
			function(status){
				console.log('restlink server request progress :' + status);
			});

			return server_request_promise;
		},
		////////////////////////////////////
		GET_from_cache_only: function(model, options){
			throw 'GET_from_cache_only not implemented';
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

	});

	return restlink;
}); // requirejs module
