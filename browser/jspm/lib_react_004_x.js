import React from 'react';
import ReactDOM from 'react-dom';

// https://facebook.github.io/react/docs/reusable-components.html
class CoolComponent extends React.Component {

	constructor (props) {
		super(props)
	}

	// inheriting :
	// .state => NEVER mutate this.state directly, treat this.state as if it were immutable.
	// .setState(nextState, [callback])
	// .replaceState(nextState, [callback]) XXX do not use, pending removal
	// forceUpdate([callback])


	getInitialState () {
		console.info('~~ getInitialState')
		return {
			foo: 42
		}
	}

	getDefaultProps () {
		console.info('~~ getDefaultProps')
		return {
			value: 'default value'
		}
	}

	// invoked once
	componentWillMount () {
		console.info('~~ componentWillMount')

	}

	render (props) {
		console.info('~~ render')
		return (
			<p>
				Hello, <input type="text" placeholder="Your name here" /> !
			</p>
		)
	}

	// invoked once, client only
	componentDidMount () {
		console.info('~~ componentDidMount')

	}

	// https://facebook.github.io/react/docs/component-specs.html#updating-componentwillreceiveprops
	// REM : props way NOT have changed
	// cf. https://facebook.github.io/react/blog/2016/01/08/A-implies-B-does-not-imply-B-implies-A.html
	componentWillReceiveProps (nextProps) {
		console.info('~~ componentWillReceiveProps')

	}

	// https://facebook.github.io/react/docs/component-specs.html#updating-shouldcomponentupdate
	shouldComponentUpdate (nextProps, nextState) {
		console.info('~~ shouldComponentUpdate')
		return true // optimisation possible
	}

	// https://facebook.github.io/react/docs/component-specs.html#updating-componentwillupdate
	// REM : NOT called in the initial rendering
	componentWillUpdate (nextProps, nextState) {
		console.info('~~ componentWillUpdate')
		return true // optimisation possible
	}

	// https://facebook.github.io/react/docs/component-specs.html#updating-componentdidupdate
	componentDidUpdate (prevProps, prevState) {
		console.info('~~ componentDidUpdate')

	}

	// https://facebook.github.io/react/docs/component-specs.html#unmounting-componentwillunmount
	componentWillUnmount () {
		console.info('~~ componentWillUnmount')

	}
}

// https://facebook.github.io/react/docs/reusable-components.html#prop-validation
CoolComponent.propTypes = {
	initialCount: React.PropTypes.number,
	children: React.PropTypes.element.isRequired
}

CoolComponent.defaultProps = {
	initialCount: 0
}

// CoolComponent.mixins

// CoolComponent.statics


ReactDOM.render(
	<CoolComponent />,
	document.getElementById('example')
)
