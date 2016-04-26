import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin'

import Layout from './components/layout/index'

import '../../assets/fonts/MaterialIcons/material-icons.css!'
import '../../assets/fonts/Roboto/roboto-regular.css!'

import { createStore } from 'redux'

const store = createStore(function init(...args) {
	console.log('Init reducer was called with args', args)
})

injectTapEventPlugin()

ReactDOM.render(
	<Layout />,
	document.getElementById('content')
)
