#!/usr/bin/env node
'use strict';

console.log('Hello world !')

/////////////////////////////////////////

const _ = require('lodash')

/////////////////////////////////////////


const DEBOUNCE_DELAY_MS = 100
const THROTTLE_INTERVAL_MS = 3000
const throttledSend = _.debounce(_.throttle(send, THROTTLE_INTERVAL_MS), DEBOUNCE_DELAY_MS)

function send(text) {
	console.log(Date.now() + ' - ' + text)
}

throttledSend('call n°1')

setTimeout(() => {
	throttledSend('call n°2')
}, DEBOUNCE_DELAY_MS * 2)
