if (typeof define !== 'function') { var define = require('amdefine')(module) }

define(
[
	'underscore',
	'offirmo/base/backbone/base_object'
],
function(_, BaseObject) {
	"use strict";

	var defaults = {
		max_recents_size:   10,
		max_favorites_size: 10
	};

	var ParentModel = BaseObject;
	var RecentAndFavs = ParentModel.extend({

		defaults: function(){
			var this_class_defaults = {
				serialization_version: 1,
				recents: [],
				max_recents_size: defaults.max_recents_size,
				favorites: [],
				max_favorites_size: defaults.max_favorites_size
			};

			// merge with parent's defaults if needed
			var parent_defaults = new ParentModel().attributes;
			return _.defaults(this_class_defaults, parent_defaults);
		},

		add_recent: function(elem) {
			var recents = this.get('recents');

			// don't want to add it twice
			// but should be moved first (more recent) if already present

			recents = _.without(recents, elem); // remove if present

			recents.unshift(elem); // insert new in head

			// reduce size if needed
			recents = _.first(recents, this.get('max_recents_size'));

			this.set('recents', recents);
		},

		toggle_favorite: function(elem) {
			var favorites = this.get('favorites');

			if ( _.indexOf( favorites, elem ) >= 0 )
			{
				// already here -> remove it
				favorites = _.without(favorites, elem);
			}
			else
			{
				// size limit ?
				// We should remove the last used.
				// TODO one day

				// add it
				favorites.push(elem);

				favorites.sort(); // good idea ?
			}

			this.set('favorites', favorites);
		},

		validate: function(attrs, options) {
			// in this case, we can reuse parent validation
			var parent_validation = (new ParentModel).validate(attrs, options);
			if(typeof parent_validation !== 'undefined') {
				return parent_validation;
			}

			// TODO own validation
		}
	});

	return RecentAndFavs;
});
