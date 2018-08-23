import React from 'react';

import List from 'material-ui/lib/lists/list';
import Divider from 'material-ui/lib/divider';

import Step from '../step/index'

const data = [
	{
		id: 1,
		type:         'flight',
		start_place:  'Paris ',
		start_date:   new Date(2016, 6, 2, 16, 40),
		duration_min: 6.5 * 60
	},
	{
		id: 2,
		type:         'flight',
		start_place:  'Doha',
		start_date:   new Date(2016, 6, 3, 0, 10),
		duration_min: 30
	},
]
export default class Journey extends React.Component {

	render () {

		var items = [];
		data.forEach((step) => {
			items.push(<Step key={step.id * 10} {...step} />)
			items.push(<Divider key={step.id * 10 + 1} />)
		})

		return (
			<List subheader="Your nice trip...">
				{items}
			</List>
		)
	}
}
