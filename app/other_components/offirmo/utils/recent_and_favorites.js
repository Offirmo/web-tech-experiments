"use strict";
if (typeof define !== 'function') { var define = require('amdefine')(module) }

define(
[
	'backbone',
	'underscore'
],
function(Backbone, _) {

	var defaults = {
		max_recents_size:   10,
		max_favorites_size: 10
	};

	var RecentAndFavs = Backbone.Model.extend({

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

		},

		defaults: function(){
			return {
				recents: [],
				max_recents_size: defaults.max_recents_size,
				favorites: [],
				max_favorites_size: defaults.max_favorites_size
			}
		}
	});

	return RecentAndFavs;
});
