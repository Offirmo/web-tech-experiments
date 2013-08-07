/* Static list of all available offirmo apps
 * Ex. google docs, gmail, youtube, etc.
 */
if (typeof define !== 'function') { var define = require('amdefine')(module) }

define(
[
	'underscore',
	'backbone',
	'offirmo/app/app'
],
function(_, Backbone, App) {
	"use strict";

	var stargate_adventures = new App({
		denomination: 'Stargate Adventures',
		url_id: 'stargate'
	});
	//Object.freeze(stargate_adventures);

	var friend_library      = new App({
		denomination: 'Friend Library',
		url_id: 'friendlib'
	});
	//Object.freeze(friend_library);

	var flashcards          = new App({
		denomination: 'Flashcards',
		url_id: 'flashcard'
	});
	//Object.freeze(flashcards);

	var five_minutes        = new App({
		denomination: '5 minutes',
		url_id: '5minutes'
	});
	//Object.freeze(five_minutes);

	var app_list = [ stargate_adventures, friend_library, flashcards, five_minutes ];
	Object.freeze(app_list);

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
				_.each(app_list, function(app) {
					console.log(app);
					model.push(app);
				});
				model.trigger('sync', model, undefined, options);
				return;
			}

			throw 'AppList sync only allows read (fetch) !';
		}
	});

	// "static" functions
	AppList.detect_current_app = function() {
		// for now
		return stargate_adventures;
	}

	return AppList;
});
