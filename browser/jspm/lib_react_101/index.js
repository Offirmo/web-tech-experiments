import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin'

import Layout from './components/layout/index'

import '../../assets/fonts/MaterialIcons/material-icons.css!'
import '../../assets/fonts/Roboto/roboto-regular.css!'

injectTapEventPlugin()

ReactDOM.render(
	<Layout />,
	document.getElementById('content')
)
