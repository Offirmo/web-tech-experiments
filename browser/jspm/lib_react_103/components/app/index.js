import React from 'react';
import { connect } from 'react-redux'

import Menu from '../menu/index'
import Journey from '../journey/index'
import Fab from '../fab/index'
import {actions} from '../../models/journey'

////////////////////////////////////

let App = ({
	onFabClick
}) => (
	<div>
		<Menu />
		<Journey />
		<Fab onClick={onFabClick} />
	</div>
)

////////////////////////////////////

const mapDispatchToProps = (dispatch) => {
	return {
		onFabClick: () => {
			dispatch(actions.add_step())
		}
	}
}

App = connect(
	null,
	mapDispatchToProps
)(App)

export default App
