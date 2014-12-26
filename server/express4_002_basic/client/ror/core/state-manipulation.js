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
		var state = server.state;
		var Data = server.Data;


		function ensure_currency(currency) {
			if(! state.currencies[currency.id]) {
				var currency_state = _.clone(currency);
				currency_state.count = 0;
				state.currencies[currency.id] = currency_state;
				state.mark_as_dirty('currencies.' + currency.id);
			}
			return state.currencies[currency.id];
		}
		state.add_currency = function(currency, qty) {
			qty = (typeof qty === 'undefined') ? 1 : qty;
			var currency_state = ensure_currency(currency);
			currency_state.count += qty;
			state.mark_as_dirty('currencies.' + currency.id);
		};



		function ensure_unit(model) {
			if(! state.units[model.id]) {
				var unit_census = _.clone(model);
				unit_census.count = 0;
				//unit_census.details = 0;
				state.units[model.id] = unit_census;
				state.mark_as_dirty('census.' + model.id);
			}
			return state.units[model.id];
		}
		state.add_unit = function(model, qty) {
			qty = (typeof qty === 'undefined') ? 1 : qty;
			var unit_census = ensure_unit(model);
			unit_census.count += qty;
			state.mark_as_dirty('units.' + model.id);
		};





		state.init_blank = function() {
			// reveal the 3 base currencies
			state.add_currency(Data.currencies['energy'], 0);
			state.add_currency(Data.currencies['materials'], 0);
			state.add_currency(Data.currencies['experience'], 0);
			// the 1st unit
			state.add_unit(Data.replicator_models['mini-crab']);
			// the starting place

			// the story set
			//progress_story(Data.story_steps.story_begins);
			//progress_story(Data.story_steps.story_unfolds);
		};
	}


	return {
		extend: extend
	};
});
