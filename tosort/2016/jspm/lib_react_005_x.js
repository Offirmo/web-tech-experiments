import React from 'react';
import ReactDOM from 'react-dom';

// https://facebook.github.io/react/docs/reusable-components.html
class CoolComponent extends React.Component {

	constructor (props) {
		console.info('~~ constructor', arguments)
		super(props)
		// define initial state
		this.state = {
			click_count: 0
		}
	}

	// inheriting :
	// .state => NEVER mutate this.state directly, treat this.state as if it were immutable.
	// .setState(nextState, [callback])
	// .replaceState(nextState, [callback]) XXX do not use, pending removal
	// .forceUpdate([callback])
	// setProps

	on_button_click() {
		console.info('~~ on_button_click', arguments)
		this.setState({
			click_count: ++this.state.click_count
		})
	}

	// invoked once
	componentWillMount () {
		console.info('~~ componentWillMount', arguments)

	}

	render () {
		console.count('~~ render')
		console.info('~~ render', arguments, this.props, this.state)
		return (
			<p>
				Hello. <button onClick={this.on_button_click.bind(this)}>{this.props.label}</button><br />
				Click count : {this.state.click_count}
			</p>
		)
	}

	// invoked once, client only
	componentDidMount () {
		console.info('~~ componentDidMount', arguments)

	}

	// https://facebook.github.io/react/docs/component-specs.html#updating-componentwillreceiveprops
	// REM : props way NOT have changed
	// cf. https://facebook.github.io/react/blog/2016/01/08/A-implies-B-does-not-imply-B-implies-A.html
	componentWillReceiveProps (nextProps) {
		console.info('~~ componentWillReceiveProps', arguments)

	}

	// https://facebook.github.io/react/docs/component-specs.html#updating-shouldcomponentupdate
	shouldComponentUpdate (nextProps, nextState) {
		console.info('~~ shouldComponentUpdate', arguments)
		return true // optimisation possible
	}

	// https://facebook.github.io/react/docs/component-specs.html#updating-componentwillupdate
	// REM : NOT called in the initial rendering
	componentWillUpdate (nextProps, nextState) {
		console.info('~~ componentWillUpdate', arguments)
		return true // optimisation possible
	}

	// https://facebook.github.io/react/docs/component-specs.html#updating-componentdidupdate
	componentDidUpdate (prevProps, prevState) {
		console.info('~~ componentDidUpdate', arguments)

	}

	// https://facebook.github.io/react/docs/component-specs.html#unmounting-componentwillunmount
	componentWillUnmount () {
		console.info('~~ componentWillUnmount', arguments)

	}
}

// https://facebook.github.io/react/docs/reusable-components.html#prop-validation
CoolComponent.propTypes = {
	label: React.PropTypes.string,
	//children: React.PropTypes.element.isRequired
}

CoolComponent.defaultProps = {
	label: 'Click me.'
}

// CoolComponent.mixins

// CoolComponent.statics


ReactDOM.render(
	<CoolComponent label="Click me quick !" />,
	document.getElementById('example')
)
