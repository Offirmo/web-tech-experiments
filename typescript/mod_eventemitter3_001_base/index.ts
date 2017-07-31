#!/bin/sh
':' //# http://sambal.org/?p=1014 ; exec `dirname $0`/../../node_modules/.bin/ts-node "$0" "$@"
console.log('Hello, world !')

import { ListenerFn, EventEmitter } from 'eventemitter3'


const ee = new EventEmitter()

ee.on('event', () => {
	console.log('an event occurred!')
})
ee.emit('event')
