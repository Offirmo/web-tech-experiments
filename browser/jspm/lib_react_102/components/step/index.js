import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin'

import ListItem from 'material-ui/lib/lists/list-item';
import Colors from 'material-ui/lib/styles/colors';
import IconButton from 'material-ui/lib/icon-button';
import MoreIcon from 'material-ui/lib/svg-icons/navigation/more-horiz';
import MoreVertIcon from 'material-ui/lib/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/lib/menus/icon-menu';
import MenuItem from 'material-ui/lib/menus/menu-item';
import FontIcon from 'material-ui/lib/font-icon';
import Immutable from 'immutable'

import moment from 'moment'
import 'moment/locale/fr'

const LOCALE = 'fr'
const DATE_FORMAT = 'lll'

const iconStyles = {
	margin: '6px 24px 0px 24px'
};

const iconButtonElement = (
	<IconButton touch={true}>
		<MoreIcon color={Colors.grey400} />
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

	constructor(props) {
		super(props);
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
	}

	render () {
		let icon, color
		switch(this.props.type) {
			case 'home':
				icon = 'home'
				break
			case 'visit':
				icon = 'photo_camera'
				break
			default:
				icon = 'local_airport'
				break
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
		switch(this.props.type) {
			case 'home':
			case 'visit':
			default:
				color = Colors.red500
				break
		}

		const date_string = moment(this.props.start_date).locale(LOCALE).format(DATE_FORMAT)

		const primary_text = `${date_string} - ${this.props.start_place}`
		const secondaryText = `${this.props.duration_min} min.`

		return (
			<ListItem
				leftIcon={<MoreVertIcon color={Colors.grey400} />}
				leftAvatar={<FontIcon className="material-icons" style={iconStyles} color={color}>{icon}</FontIcon>}
				primaryText={primary_text}
				secondaryText={secondaryText}
				secondaryTextLines={1}
				rightIconButton={rightIconMenu}
			/>
		)
	}
}

Step.DEFAULTS = {
	type:         'visit',
	start_place:  '?',
	start_date:   Date.now(),
	duration_min: 30
}

Step.propTypes = {
	type:         React.PropTypes.string,
	start_place:  React.PropTypes.string,
	start_date:   React.PropTypes.number,
	duration_min: React.PropTypes.number
}

Step.defaultProps = Step.DEFAULTS
