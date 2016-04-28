import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin'
import { createStore } from 'redux'

// http://www.material-ui.com/
// https://design.google.com/icons/

import {reducer} from './models/app'

import Layout from './components/layout/index'

import '../../assets/fonts/MaterialIcons/material-icons.css!'
import '../../assets/fonts/Roboto/roboto-regular.css!'

injectTapEventPlugin()

function top_reducer(state, action) {
	console.group(`Action ${action.type}`);
	console.log('prev state', state ? state.toJS() : state);

	const newState = reducer(state, action)

	console.log('new state', newState.toJS());
	console.groupEnd();

	return newState
}

import { Provider } from 'react-redux'

ReactDOM.render(
	<Provider store={createStore(top_reducer)} >
		<Layout />
	</Provider>,
	document.getElementById('content')
)
