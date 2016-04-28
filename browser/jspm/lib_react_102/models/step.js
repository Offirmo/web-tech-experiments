import Immutable from 'immutable'

export const DEFAULTS = {
	type:         'visit',
	start_place:  '?',
	start_date:   Date.now(),
	duration_min: 30
}

export function reducer(state, action) {
	state = state || Immutable.fromJS(DEFAULTS)

	switch (action.type) {
		case 'STEP_SET_TYPE':
			return state; // TODO

		case 'STEP_SET_DATE':
			return state; // TODO

		case 'STEP_SET_PLACE':
			return state; // TODO

		case 'STEP_SET_DURATION':
			return state; // TODO

		default:
			return state;
	}
}

export default reducer
