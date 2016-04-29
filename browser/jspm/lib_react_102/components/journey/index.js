import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { connect } from 'react-redux'

import List from 'material-ui/lib/lists/list'
import Divider from 'material-ui/lib/divider'

import Step from '../step/index'

export default class Journey extends React.Component {

	constructor(props) {
		super(props);
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
	}


	componentDidMount() {
		const { store } = this.context
		this.unsubscribe = store.subscribe(() =>
			this.forceUpdate()
		)
	}

	render () {

		const store = this.context.store
		const state_im = store.getState()
		const steps = state_im.getIn(['journey', 'steps']).toJS()

		var items = []
		//console.log(steps)
		steps.forEach((step) => {
			items.push(<Step key={step.id * 10} {...step} />)
			items.push(<Divider key={step.id * 10 + 1} />)
		})

		return (
			<List subheader="Your nice trip...">
				{items}
			</List>
		)
	}

	static reducer(state, action) {
		state = state || Immutable.Map(Step.DEFAULTS)

		switch (action.type) {
			case 'JOURNEY_ADD_STEP':
				return state; // TODO
			case 'JOURNEY_DELETE_STEP':
				return state; // TODO
			case 'JOURNEY_MOVE_STEP':
				return state; // TODO
			default:
				return state;
		}
	}
}

Journey.contextTypes = {
	store: React.PropTypes.object
}
