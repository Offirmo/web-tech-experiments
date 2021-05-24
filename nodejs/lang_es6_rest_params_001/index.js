#!/bin/sh
':' //# https://sambal.org/?p=1014 ; exec /usr/bin/env node --harmony_modules --harmony_regexp_property "$0" "$@"
'use strict';

// https://nodejs.org/en/docs/es6/
// node --v8-options | grep "in progress"

console.log('Hello world !')

const _ = require('lodash')

function make_prefixed_logger(prefix, log_fn, options = {}) {
	options.spacer_alt = options.spacer_alt || options.spacer || ''
	options.spacer = options.spacer || ' '
	options.prefix = _.isFunction(prefix) ? prefix : () => prefix

	return function log(param1, ...rest) {
		if(_.isString(param1))
			console.log(options.prefix() + options.spacer + param1, ...rest)
		else
			console.log(options.prefix() + options.spacer_alt, param1, ...rest)
	}
}

const logger1 = make_prefixed_logger('- [p1]', console.log.bind(console))
const logger2 = make_prefixed_logger('* P2:', console.log.bind(console))
const logger3 = make_prefixed_logger(() => Date.now(), console.log.bind(console), {
	separator: ' - ',
	separator_alt: ' -'
})

logger1('Hello', 42)
logger1({foo: 'bar'})
logger2('Hello', 42)
logger2({foo: 'bar'})
logger3('Hello', 42)
logger3({foo: 'bar'})
