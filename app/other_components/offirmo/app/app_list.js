/* Static list of all available offirmo apps
 * Ex. google docs, gmail, youtube, etc.
 */
"use strict";
if (typeof define !== 'function') { var define = require('amdefine')(module) }

define(
[
	'underscore',
	'backbone',
	'offirmo/app/app'
],
function(_, Backbone, App) {

	var stargate_adventures = new App({
		denomination: 'Stargate Adventures',
		url_id: 'stargate'
	});
	var friend_library      = new App({
		denomination: 'Friend Library',
		url_id: 'friendlib'
	});
	var flashcards          = new App({
		denomination: 'Flashcards',
		url_id: 'flashcard'
	});
	var five_minutes        = new App({
		denomination: '5 minutes',
		url_id: '5minutes'
	});

	var list = [ stargate_adventures, friend_library, flashcards, five_minutes ];

	var AppList = Backbone.Collection.extend({

		model: App,
		url: 'apps',

		sync: function(method, model, options)
		{
			options || (options = {});

			//console.log("Backbone.AppList.sync called : " + method, options);

			if(method === 'read') {
				// reset and refill the collection
				this.reset();
				_.each(list, function(app) {
					model.push(app);
				});
				model.trigger('sync', model, undefined, options);
				return;
			}

			throw 'AppList sync only allows read (fetch) !';
		}
	});

	return AppList;
});
