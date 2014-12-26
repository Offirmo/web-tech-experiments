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
	'./state-publication',
	'./state-manipulation',
	'./event-emitter',
	'./fsm',
	'./api/index',
],
function(_, Data, Errors, Options, config, State, StatePublication, StateManipulation, EventEmitter, Fsm, Api) {
	'use strict';


	function RorServer(options) {

		options = Options.check_and_complete(options);

		options.logger.log('Instantiating a new v' + config.version + ' RoR server...');

		this.options = options;
		this.config = config;
		this.Data = Data;
		this.logger = options.logger; // shortcut

		this.state = State.make_new(options);

		StatePublication.extend(this);
		StateManipulation.extend(this);
		EventEmitter.extend(this);
		Fsm.extend(this);
		Api.extend(this);


		console.log('server created', this);

		// shortcuts
		var logger = this.logger;



		////////////////////////////////////

		/// data for external API
		/*
		function emit_meta() {
			ee.emit('meta_update', get_meta());
		}

		this.get_story = function get_story() {
			return state.story;
		};
		function emit_story_progress(story_step) {
			ee.emit('story_progress', story_step);
		}

		var get_census = this.get_census = function get_census() {

		};
		function emit_census() {
			ee.emit('census_update', get_census());
		}


		////////////////////////////////////


		// send a story log line / story cutscene
		function progress_story(story_step) {
			state.story.push(story_step); // REM : add at the end
			if(state.story > config.story_queue_size)
				state.story.shift(); // REM : remove first
			emit_story_progress(story_step);
		}

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

		//
		this.post_action = function(action_id, params) {
			// TODO add callback mechanism
			var action = params;
			action.id = action_id;
			this.fsm.enqueue_action(action);
		};
		*/
	}

	return {
		make_new: function(options) { return new RorServer(options); }
	};
});
