import React from 'react';

import ListItem from 'material-ui/lib/lists/list-item';
import Colors from 'material-ui/lib/styles/colors';
import IconButton from 'material-ui/lib/icon-button';
import MoreIcon from 'material-ui/lib/svg-icons/navigation/more-horiz';
import MoreVertIcon from 'material-ui/lib/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/lib/menus/icon-menu';
import MenuItem from 'material-ui/lib/menus/menu-item';
import FontIcon from 'material-ui/lib/font-icon';

import moment from 'moment'
import 'moment/locale/fr'

const LOCALE = 'fr'
const DATE_FORMAT = 'lll'


////////////////////////////////////

const rightMenuIcon = (
	<IconButton touch={true}>
		<MoreIcon color={Colors.grey400} />
	</IconButton>
);

const rightMenu = (
	<IconMenu iconButtonElement={rightMenuIcon}>
		<MenuItem>Reply</MenuItem>
		<MenuItem>Forward</MenuItem>
		<MenuItem>Delete</MenuItem>
	</IconMenu>
);


const iconStyles = {
	margin: '6px 24px 0px 24px'
};

const StepListItem = ({
	icon,
	color,
	primary_text,
	secondaryText
}) => (
	<ListItem
		leftIcon={<MoreVertIcon color={Colors.grey400} />}
		leftAvatar={<FontIcon className="material-icons" style={iconStyles} color={color}>{icon}</FontIcon>}
		primaryText={primary_text}
		secondaryText={secondaryText}
		secondaryTextLines={1}
		rightIconButton={rightMenu}
	/>
)

////////////////////////////////////

function get_icon(type) {
	switch(type) {
	case 'home':
		return 'home'
	case 'visit':
		return 'photo_camera'
	default:
		return 'local_airport'
		// landscape
		// directions bike boat bus car run walk
		// subway
		// flight
		// local_hotel
		// restaurant
		// train tram
		// beach_access
		// pool
	}
}

function get_color(type) {
	switch(type) {
		case 'home':
		case 'visit':
		default:
			return Colors.red500
	}
}

let Step = ({
	type,
	start_place,
	start_date,
	duration_min
}) => {
	const date_string = moment(start_date).locale(LOCALE).format(DATE_FORMAT)

	const params = {
		icon: get_icon(type),
		color: get_color(type),
		primary_text: `${date_string} - ${start_place}`,
		secondaryText: `${duration_min} min.`
	}

	return <StepListItem {...params} />
}

Step.propTypes = {
	type:         React.PropTypes.string,
	start_place:  React.PropTypes.string,
	start_date:   React.PropTypes.number,
	duration_min: React.PropTypes.number
}

export default Step
