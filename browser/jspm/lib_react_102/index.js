import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin'

// http://www.material-ui.com/
// https://design.google.com/icons/

import Layout from './components/layout/index'

import '../../assets/fonts/MaterialIcons/material-icons.css!'
import '../../assets/fonts/Roboto/roboto-regular.css!'

import { createStore } from 'redux'

const store = createStore(function init(...args) {
	console.log('Init reducer was called with args', args)

	return {
		id_generation: 0,
		steps: []
	}
})

injectTapEventPlugin()

ReactDOM.render(
	<Layout />,
	document.getElementById('content')
)
