/** Rise of the replicators low level state manipulation
 */
define(
[
	'lodash',
	'./errors'
],
function(_, Errors) {
	'use strict';

	function extend(server) {

		// shortcut
		var config = server.config;
		var state = server.state;
		var story = state.story;
		var Data = server.Data;


		////// Currencies
		function ensure_currency(currency) {
			if(! state.currencies[currency.id]) {
				var currency_state = _.clone(currency);
				currency_state.count = 0;
				state.currencies[currency.id] = currency_state;
				server.mark_API_data_as_dirty('/currencies', currency.id);
			}
			return state.currencies[currency.id];
		}
		state.add_currency = function(currency, qty) {
			qty = (typeof qty === 'undefined') ? 1 : qty;
			var currency_state = ensure_currency(currency);
			currency_state.count += qty;
			server.mark_API_data_as_dirty('/currencies', currency.id);
		};


		////// Units
		function ensure_unit(model) {
			if(! state.units[model.id]) {
				var unit_census = _.clone(model);
				unit_census.count = 0;
				//unit_census.details = 0;
				state.units[model.id] = unit_census;
				server.mark_API_data_as_dirty('/census', model.id);
			}
			return state.units[model.id];
		}
		state.add_unit = function(model, qty) {
			qty = (typeof qty === 'undefined') ? 1 : qty;
			var unit_census = ensure_unit(model);
			unit_census.count += qty;
			server.mark_API_data_as_dirty('/units', model.id);
		};


		////// Story

		function maybe_update_summary(possible_summary) {
			if(! _.isString(possible_summary)) return;

			story._.summary = possible_summary;
			server.mark_API_data_as_dirty('/story', 'summary');
		}

		function maybe_update_story_lead(possible_story_lead) {
			if(! _.isString(possible_story_lead)) return;

			story._.lead = possible_story_lead;
			server.mark_API_data_as_dirty('/story', 'lead');
		}

		function maybe_activate_new_place(possible_place_id) {
			if(! _.isString(possible_place_id)) return;

			var place = _.find(story._.places, {id: possible_place_id});
			if(! place) {
				// add this place
				place = Data.places[possible_place_id];
				story._.places.push(place);
				server.mark_API_data_as_dirty('/story', 'places');
			}
			if(story._.current_place_id !== place.id) {
				story._.current_place_id = place.id;
				server.mark_API_data_as_dirty('/story', 'current_place_id');
			}
		}

		function add_journal_entry(development) {
			var journal = story._.last_journal_entries; // shortcut
			journal.push(development); // REM : add at the end
			if(journal.length > config.story_queue_size)
				journal.shift(); // REM : remove first
			server.mark_API_data_as_dirty('/story', 'last_journal_entries');
		}

		// advance story if needed
		function unfold_story() {
			var current_episode = story._.current_episode;

			var next_development;
			while(next_development = current_episode.developments[story._.next_development_index]) {
				var last_development = story._.last_development = next_development;
				story._.next_development_index++;

				// which type ?
				switch(last_development.type) {
					case 'journal':
						add_journal_entry(last_development);
						break;
					default:
						throw new Errors.EE.UnknownEnumValue('Unknown story development type : "' + last_development.type + '" !');
				}

				// update what needed
				maybe_update_summary(last_development.summary); // if any
				maybe_update_story_lead(last_development.story_lead); // if any
				maybe_activate_new_place(last_development.place); // if any
			}
		}

		function activate_next_episode() {
			console.log('advancing to episode #' + story._.next_episode_index)
			var current_episode = story._.current_episode = story[story._.next_episode_index];
			if(!_.isObject(current_episode)) throw new Errors.InternalError('Couldnt locate episode !');
			story._.next_episode_index++;
			story._.next_development_index = 0; // since new episode

			// update what needed
			maybe_update_summary(current_episode.summary); // if any
			maybe_update_story_lead(current_episode.story_lead); // if any
			maybe_activate_new_place(current_episode.place); // if any

			// now update developments
			unfold_story();
		}





		state.init_blank = function() {
			// reveal the 3 base currencies
			state.add_currency(Data.currencies['energy'], 0);
			state.add_currency(Data.currencies['materials'], 0);
			state.add_currency(Data.currencies['experience'], 0);
			// the 1st unit
			state.add_unit(Data.replicator_models['mini-crab']);
			// the story set
			activate_next_episode();
			//progress_story(Data.story_steps.story_begins);
			//progress_story(Data.story_steps.story_unfolds);
		};
	}


	return {
		extend: extend
	};
});
