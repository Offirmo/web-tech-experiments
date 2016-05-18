import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin'
import { applyMiddleware, createStore } from 'redux'
import { isFSA } from 'flux-standard-action'
import createLogger from 'redux-logger';
import { Provider } from 'react-redux'
import {Iterable} from 'immutable';

// http://www.material-ui.com/
// https://design.google.com/icons/

import {reducer} from './models/app'

import App from './components/app/index'

import '../../assets/fonts/MaterialIcons/material-icons.css!'
import '../../assets/fonts/Roboto/roboto-regular.css!'

injectTapEventPlugin()

function top_reducer(state, action) {
	console.group(`[redux] Action ${action.type}`);

	console.log('prev state', state ? state.toJS() : state);

	if(! isFSA(action)) {
		console.error('action is not an FSA !', action)
	}
	else {
		console.info('action', action)
	}

	const newState = reducer(state, action)

	console.info('new state', newState.toJS());
	console.groupEnd();

	return newState
}


const redux_middlewares = [];

const redux_logger = createLogger({
	stateTransformer: state => state ? state.toJS() : state
})
redux_middlewares.push(redux_logger)

ReactDOM.render(
	<Provider store={createStore(
		reducer,
		applyMiddleware(...redux_middlewares)
	)} >
		<App />
	</Provider>,
	document.getElementById('content')
)
