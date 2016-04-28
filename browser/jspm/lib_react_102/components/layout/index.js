import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin'

import Menu from '../menu/index'
import Journey from '../journey/index'
import Fab from '../fab/index'

export default class Layout extends React.Component {

	constructor(props) {
		super(props);
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)

		this.addNewStep = this.addNewStep.bind(this)
	}

	addNewStep () {
		const store = this.context.store
		console.log('hello !')
		store.dispatch({
			type: 'JOURNEY_ADD_STEP'
		})
	}

	render () {
		return (
			<div>
				<Menu />

				<Journey />

				<Fab onClick={this.addNewStep} />
			</div>
		)
	}
}

Layout.contextTypes = {
	store: React.PropTypes.object
}
