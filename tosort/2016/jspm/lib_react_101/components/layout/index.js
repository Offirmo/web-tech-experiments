import React from 'react';

import Menu from '../menu/index'
import Journey from '../journey/index'
import Fab from '../fab/index'

export default class Layout extends React.Component {
	render () {
		return (
			<div>
				<Menu />
				<Journey />
				<Fab />
			</div>
		)
	}
}
