/* A 'base' object from which all offirmo objects will inherit
 * useful to add some utilities.
 */
if (typeof define !== 'function') { var define = require('amdefine')(module); }

define(
[
	'underscore',
	'backbone'
],
function(_, Backbone) {
	"use strict";

	var Constants = {
		cache_strategy_cachable: 'cachable', //< this object is allowed to be cached
		cache_strategy_always_in_sync: 'always_in_sync', //< this object should always be in sync (as much as possible)

		fetch_origin_none:   'none',   // this object was never fetched
		fetch_origin_cache:  'cache',  // this object was last fetched from cache, it may be out of sync with the server
		fetch_origin_server: 'server'  // this object was last fetched from the server, it is supposed up to date
		                               // (depending on the date and status of course !)
	};

	var BaseObject = Backbone.Model.extend({

		defaults: function(){
			return {
				// constants, all grouped under a common property for readability
				'constants': Constants,

				// incremented this code each time the schema changes
				// this allow to match serialization code and serialized data
				serialization_version: 0,

				url: 'basemodel', //< (backbone) url fragment for this object (should be overriden by derived classe)
				aggregation_parent: undefined, //< parent/owner of this object
				                               //  important for building a correct url : parent/<id>/child/<id>
				aggregation_parent_only_child: false, //< by default, consider there are
				                                      // several children like us under the parent
				                                      // so we'll add our id into the url

				last_fetch_origin: Constants.fetch_origin_none, //< Origin of last fetch ?
				last_server_fetch_date: undefined, //< TOREVIEW
				cache_strategy: Constants.cache_strategy_cachable, // by default
				cache_max_duration: undefined, // TOREVIEW

				restlink_client: undefined, //< the restlink client to which we'll sync

				// attributes that should not be persisted
				// (usually because constants or client-only)
				attributes_serialization_blacklist: [
					'constants', 'aggregation_parent', 'aggregation_parent_only_child',
					'last_fetch_origin', 'last_server_fetch_date',
					'cache_strategy', 'cache_max_duration',
					'restlink_client'
				]
			};
		},

		set_restlink_client: function(client) {
			this.set('restlink_client', client);
		},

		validate: function(attrs, options) {
			if(_.isUndefined(attrs.serialization_version)) {
				return 'Must have a serialization version !';
			}
			if(!_.isNumber(attrs.serialization_version)) {
				return 'Serialization version must be a number !';
			}
			if(attrs.serialization_version < 0) {
				return 'Serialization version must be >= 0 !';
			}
		},

		// if asked for a refresh,
		// do this object really needs a refresh from the server
		// or is it still valid according to its cache status ?
		really_needs_refresh: function() {
			var cache_strategy = this.get('cache_strategy');

			if(cache_strategy === Constants.always_in_sync) {
				return true;
			}

			if(typeof this.get('last_server_fetch_date') === 'undefined') {
				return true;
			}

			// todo check cache expiration
			var current_date = new Date;
			// ...

			return true; // for now
		},

		compute_id: function() {
			return this.get('id'); // by default
		},

		compute_url: function() {
			var this_url = '';
			var aggregation_parent = this.get('aggregation_parent');
			if(aggregation_parent) {
				this_url = aggregation_parent.compute_url() + '/';
			}
			this_url = this_url + this.get('url') + '/' + this.compute_id();
			return this_url;
		}

	});

	return BaseObject;
}); // requirejs module
