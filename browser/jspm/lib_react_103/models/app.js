import Immutable from 'immutable'

import {reducer as journey_reducer, DEFAULTS as journey_defaults} from './journey'

////////////////////////////////////

export const DEFAULTS = {
	locale: 'fr',
	journey: journey_defaults
}

////////////////////////////////////


////////////////////////////////////

export function reducer(state, action) {
	state = state || Immutable.fromJS(DEFAULTS)

	state = state.update('journey', journey => journey_reducer(journey, action))

	switch (action.type) {
		default:
			return state;
	}
}
