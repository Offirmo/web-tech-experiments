import React from 'react';

import FloatingActionButton from 'material-ui/lib/floating-action-button';
import ContentAdd from 'material-ui/lib/svg-icons/content/add';

import './styles.css!'


const FAB = () => (
	<div id="fab">
		<FloatingActionButton>
			<ContentAdd />
		</FloatingActionButton>
	</div>
);

export default FAB;
