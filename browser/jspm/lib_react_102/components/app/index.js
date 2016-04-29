import React from 'react';
import { connect } from 'react-redux'

import Menu from '../menu/index'
import Journey from '../journey/index'
import Fab from '../fab/index'
import {actions} from '../../models/journey'

////////////////////////////////////
const RawApp = ({
	dispatch
}) => (
	<div>
		<Menu />
		<Journey />
		<Fab onClick={() => dispatch(actions.add_step())} />
	</div>
)

////////////////////////////////////

const App = connect()(RawApp)

export default App
