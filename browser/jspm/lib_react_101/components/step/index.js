import React from 'react';

import ListItem from 'material-ui/lib/lists/list-item';
import Colors from 'material-ui/lib/styles/colors';
import IconButton from 'material-ui/lib/icon-button';
import MoreVertIcon from 'material-ui/lib/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/lib/menus/icon-menu';
import MenuItem from 'material-ui/lib/menus/menu-item';
import FontIcon from 'material-ui/lib/font-icon';

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
		return (
			<ListItem
				leftIcon={<FontIcon className="material-icons" style={iconStyles} color={Colors.red500}>flight_takeoff</FontIcon>}
				rightIconButton={rightIconMenu}
				primaryText="primaryText"
				secondaryText="secondaryText"
				secondaryTextLines={1}
			/>
		)
	}
}
