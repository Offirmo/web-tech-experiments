#!/usr/bin/env node
'use strict';

console.log('Hello world !');

var _ = require('lodash');
var when = require('when');
var when_node = require('when/node');
var when_pipeline = require('when/pipeline');
var dust = require('dustjs-linkedin');

var log = require('../logger')('test');

var nconf = require('nconf');
var conf = new nconf.Provider();
conf
.argv() // read configuration from command line
.env() // read configuration from environment variables
.defaults({});

if(! conf.get('MANDRILL_API_KEY')) {
	console.error('Please set a mandrill API key : export MANDRILL_API_KEY="..."');
	process.exit(1);
}

var mandrill = when_node.lift(require('node-mandrill')(conf.get('MANDRILL_API_KEY')));




// Lift all of the fs methods, but name them with a 'P' suffix
var promised_fs = when_node.liftAll(require('fs'), function(promisedFs, liftedFunc, name) {
	promisedFs[name + 'P'] = liftedFunc;
	return promisedFs;
});

function load_dust_template(path, name) {
	console.log('* loading template…')
	return promised_fs.readFileP(path, {encoding: 'utf8'})
	.then(function(text){
		var compiled = dust.compile(text, name);
		dust.loadSource(compiled);
		return name;
	});
}

load_dust_template('template.html', 'demo')
.then(function(name) {
	console.log('* template loaded')
	return
})
.then(function(out) {
	var recipients =  [{email: 'offirmo.net+test1@gmail.com', name: 'Off Neet T1'}, {email: 'offirmo.net+test2@gmail.com', name: 'Off Neet T2'}];
	return when.map(recipients, function(recipient) {
		console.log('* processing recipient…', recipient);
		return when_pipeline([
			function() {
				console.log('* rendering template for ' + recipient.name + '…');
				return when_node.call(dust.render, 'demo', {name: recipient.name, title: 'Démonstration'});
			},
			function(email_body) {
				console.log('* template rendered : ' + email_body);
				console.log('* sending for ' + recipient.name + '…');
				// https://mandrillapp.com/api/docs/messages.JSON.html#method-send
				return mandrill('/messages/send', {
					message: {
						to: [recipient],
						from_email: 'offirmo.net@gmail.com',
						from_name: 'Offirmo robot',
						subject: "Ça c'est de l'utf-8 fumé !",
						html: email_body,
						auto_text: true
					}
				});
			}
		]);
	});
})
.then(function(responses) {
	console.log('* received mandrill ack');
	if(!_.isArray(responses))
		responses = [ responses ];
	else
		responses = _.flatten(responses); // due to pipeline + mandrill each wrapping an array
	//console.log('* responses', responses);

	_.forEach(responses, function(response) {
		if (response.status === 'invalid') {
			console.error( "XXX ERROR : ", response );
		}
		else {
			//everything's good, lets see what mandrill said
			console.log("SUCCESS", response);
		}
	});
})
.catch(function(err) {
	log.exception(err);
});
