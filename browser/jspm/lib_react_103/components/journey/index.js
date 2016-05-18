import React from 'react'
import { connect } from 'react-redux'

import List from 'material-ui/lib/lists/list'
import Divider from 'material-ui/lib/divider'

import Step from '../step/index'

////////////////////////////////////

let Journey = ({
	name,
	steps
}) => {
	let items = []
	steps.forEach(step => {
		items.push(<Step key={step.id * 10} {...step} />)
		items.push(<Divider key={step.id * 10 + 1} />)
	})
	return <List subheader={name}>{items}</List>
}

////////////////////////////////////

const mapStateToProps = (state_im) => {
	return {
		name: state_im.getIn(['journey', 'name']),
		steps: state_im.getIn(['journey', 'steps']).toJS()
	}
}

Journey = connect(
	mapStateToProps
)(Journey)

////////////////////////////////////

export default Journey
