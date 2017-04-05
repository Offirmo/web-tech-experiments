#!/usr/bin/env node
'use strict';

console.log('hello world !')

const TrafficLightsController = require('traffic-lights-simulator')

const controller = TrafficLightsController.factory({
	onStateChange: console.log
})
