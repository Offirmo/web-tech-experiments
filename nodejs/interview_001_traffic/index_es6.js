#!/bin/sh
':' //# http://sambal.org/?p=1014 ; exec `dirname $0`/../../node_modules/.bin/babel-node "$0" "$@"
'use strict';

console.log('hello world !')

import * as TrafficLightsController from 'traffic-lights-simulator'

const controller = TrafficLightsController.factory({
	onStateChange: console.log
})
