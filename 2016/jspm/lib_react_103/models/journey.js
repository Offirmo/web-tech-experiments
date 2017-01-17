import Immutable from 'immutable'
import { createAction, handleAction, handleActions } from 'redux-actions';

import {reducer as step_reducer, DEFAULTS as step_defaults} from './step'

let id_generator = 1

////////////////////////////////////

export const DEFAULTS = {
	name: 'A nice unnamed journey...',
	steps: [
		Object.assign({}, step_defaults, {
			id: id_generator++,
			rank: 1,
			type: 'home'
		}),

		Object.assign({}, step_defaults, {
			id: id_generator++,
			rank: 2,
			type: 'visit'
		}),

		Object.assign({}, step_defaults, {
			id: id_generator++,
			rank: 3,
			type: 'home'
		})
	]
}

////////////////////////////////////

export const actions = {

	add_step: createAction('JOURNEY_ADD_STEP', (step_data) => {
		console.log('building action', id_generator)

		return Object.assign({}, step_defaults, step_data || {}, {id: id_generator++})
	})

}

////////////////////////////////////

export function reducer(state, action) {
	state = state || Immutable.fromJS(DEFAULTS)

	state = state.update('steps', list => list.map(step => step_reducer(step, action)))

	switch (action.type) {
		case 'JOURNEY_ADD_STEP':
			return state.update('steps',
				list => list.push( Object.assign({}, step_defaults, action.payload) )
			)

		case 'JOURNEY_DELETE_STEP':
			return state; // TODO

		case 'JOURNEY_MOVE_STEP':
			return state; // TODO

		default:
			return state;
	}
}
