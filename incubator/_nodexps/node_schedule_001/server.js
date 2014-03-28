#!/usr/bin/env node
'use strict';

console.log('Hello world !');

// https://github.com/mattpat/node-schedule

var schedule = require('node-schedule');
var moment = require('moment');
moment.lang('fr');

var rule = new schedule.RecurrenceRule();
rule.second = 42;

var j = schedule.scheduleJob(rule, function(){
	console.log('The answer to life, the universe, and everything !', moment().format('dddd Do MMMM YYYY, HH:mm:ss'));
});
