import Immutable from 'immutable'

import {reducer as step_reducer, DEFAULTS as step_defaults} from './step'

export const DEFAULTS = {
	name: 'A nice unnamed journey...',
	steps: [
		Object.assign({}, step_defaults, {
			id: 1,
			rank: 1,
			type: 'home'
		}),

		Object.assign({}, step_defaults, {
			id: 2,
			rank: 2,
			type: 'visit'
		}),

		Object.assign({}, step_defaults, {
			id: 3,
			rank: 3,
			type: 'home'
		})
	]
}

export function reducer(state, action) {
	state = state || Immutable.fromJS(DEFAULTS)

	state = state.update('steps', list => list.map(step => step_reducer(step, action)))

	switch (action.type) {
		case 'JOURNEY_ADD_STEP':
			return state.update('steps',
				list => list.push( Object.assign({}, step_defaults, {type: 'visit', id: 4}) )
			)

		case 'JOURNEY_DELETE_STEP':
			return state; // TODO

		case 'JOURNEY_MOVE_STEP':
			return state; // TODO

		default:
			return state;
	}
}

export default reducer
