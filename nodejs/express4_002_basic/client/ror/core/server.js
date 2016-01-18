/* Rise of the replicators server
 * Following code is made to run in browser, web worker or node.js.
*/
define(
[
	'lodash',
	'./static_data',
	'./errors',
	'./options',
	'./config',
	'./state',
	'./state-manipulation',
	'./event-emitter',
	'./fsm',
	'./api/index',
	'./actions/index',
],
function(_, Data, Errors, Options, config, State, StateManipulation, EventEmitter, Fsm, Api, Actions) {
	'use strict';


	function RorServer(options) {

		options = Options.check_and_complete(options);

		options.logger.log('Instantiating a new v' + config.version + ' RoR server...');

		this.options = options;
		this.config = config;
		this.Data = Data;
		this.logger = options.logger; // shortcut

		this.state = State.make_new(options, Data);

		EventEmitter.extend(this);
		Api.extend(this);
		StateManipulation.extend(this);
		Fsm.extend(this);
		Actions.extend(this);


		console.log('server created', this);
		this.start();

		// shortcuts
		var logger = this.logger;



		////////////////////////////////////

		/*

		// add new replicator unit(s)
		function add_new_units(count) {
			state.census.units += count;
			// todo auto-assemble ?
			state.census.free_units += count;
			emit_census();
		}
		*/

		/**
		 * @param {Object} model - replicator model to assemble (from Data.replicator_models)
		 */
		/*
		function assemble_replicator(model) {
			// init just in case
			state.census.replicators[model.id] = state.census.replicators[model.id] || [];
			// shortcuts
			var units = state.census.replicators[model.id];
			// checks
			if(state.census.free_units < model.min_units) {
				var e = new Errors.NotEnoughResourcesToAssemble();
				e.model = model.id;
				e.free_units = state.census.free_units;
				e.required_units = model.min_units;
				throw e;
			}
			// build the new replicator
			var replicator = {
				id: state.next_replicator_id++,
				units: model.min_units
				// quality of pieces ?
			};
			state.census.free_units -= replicator.units;
			units.push(replicator);
			emit_census();
		}

		function process_action(action) {
			var params = action;
			action = Data.actions[action.id];
			if(! action) throw new Errors.UnknownAction(action.id);
			// TODO generic prerequisites check
			if(action.id === 'replicate') {
				add_new_units(params.count);
			}
			else if(action.id === 'assemble') {
				assemble_replicator(params.model);
			}
			else {
				throw new Errors.EE.NotImplemented('action ' + action.id);
			}
		}
		*/
	}

	return {
		make_new: function(options) { return new RorServer(options); }
	};
});
