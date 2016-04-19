import React from 'react';
import ReactDOM from 'react-dom';

/*
var HelloWorld = React.createClass({
	render: function() {
		return (
			<p>
				Hello, <input type="text" placeholder="Your name here"/>!
				It is {this.props.date.toTimeString()}
			</p>
		);
	}
});
*/

/*
function HelloWorld(props) {
	return (
		<p>
			Hello, <input type="text" placeholder="Your name here" />!
			It is {props.date.toTimeString()}
		</p>
	);
}
*/

const HelloWorld = (props) =>
	<p>
		Hello, <input type="text" placeholder="Your name here" />!
		It is {props.date.toTimeString()}
	</p>
;


setInterval(function() {
	ReactDOM.render(
		<HelloWorld date={new Date()} />,
		document.getElementById('example')
	);
}, 500);
