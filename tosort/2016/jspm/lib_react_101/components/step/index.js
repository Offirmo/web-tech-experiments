import React from 'react';

import ListItem from 'material-ui/lib/lists/list-item';
import Colors from 'material-ui/lib/styles/colors';
import IconButton from 'material-ui/lib/icon-button';
import MoreVertIcon from 'material-ui/lib/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/lib/menus/icon-menu';
import MenuItem from 'material-ui/lib/menus/menu-item';
import FontIcon from 'material-ui/lib/font-icon';

import moment from 'moment'
import 'moment/locale/fr'

const LOCALE = 'fr'
const DATE_FORMAT = 'lll'

const iconStyles = {
	marginRight: 24,
};

const iconButtonElement = (
	<IconButton
		touch={true}
		tooltip="more"
		tooltipPosition="bottom-left"
	>
		<MoreVertIcon color={Colors.grey400} />
	</IconButton>
);

const rightIconMenu = (
	<IconMenu iconButtonElement={iconButtonElement}>
		<MenuItem>Reply</MenuItem>
		<MenuItem>Forward</MenuItem>
		<MenuItem>Delete</MenuItem>
	</IconMenu>
);

export default class Step extends React.Component {

	render () {
		let icon, color
		switch(this.props.type) {
			default:
				icon = 'flight_takeoff'
				color = Colors.red500
				break
		}

		const date_string = moment(this.props.start_date).locale(LOCALE).format(DATE_FORMAT)

		const primary_text = `${date_string} - ${this.props.start_place}`
		const secondaryText = `${this.props.duration_min} min.`

		return (
			<ListItem
				leftIcon={<FontIcon className="material-icons" style={iconStyles} color={color}>{icon}</FontIcon>}
				rightIconButton={rightIconMenu}
				primaryText={primary_text}
				secondaryText={secondaryText}
				secondaryTextLines={1}
			/>
		)
	}

}

Step.propTypes = {
	type:         React.PropTypes.string,
	start_place:  React.PropTypes.string,
	start_date:   React.PropTypes.object,
	duration_min: React.PropTypes.number
}

Step.defaultProps = {
	type:         'visit',
	start_place:  '?',
	start_date:   Date.now(),
	duration_min: 30
}
