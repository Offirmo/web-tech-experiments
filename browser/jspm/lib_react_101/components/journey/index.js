import React from 'react';

import List from 'material-ui/lib/lists/list';
import Divider from 'material-ui/lib/divider';

import Step from '../step/index'

export default class Journey extends React.Component {

	render () {
		return (
			<List subheader="Your nice trip...">
				<Step />
				<Divider />
			</List>
		)
	}
}
