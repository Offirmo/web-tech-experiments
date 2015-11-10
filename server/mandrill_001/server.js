#!/usr/bin/env node
'use strict';

console.log('Hello world !');

var _ = require('lodash');

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

var mandrill = require('node-mandrill')(conf.get('MANDRILL_API_KEY'));


mandrill('/messages/send', {
	message: {
		to: [{email: 'offirmo.net@gmail', name: 'Off Neet'}, {email: 'offirmo.net@gmail.com', name: 'Off Neet'}],
		from_email: 'offirmo.net@gmail.com',
		subject: "Hey, what's up?",
		text: "Hello, I sent this message using mandrill."
	}
}, function(error, responses)
{
	//uh oh, there was an error
	if (error) {
		console.error( "XXX ERROR : " + JSON.stringify(error) );
	}
	else {
		if(!_.isArray(responses))
			responses = [ responses ];

		_.forEach(responses, function(response) {
			if (response.status === 'invalid') {
				console.error( "XXX ERROR : ", response );
			}
			else {
				//everything's good, lets see what mandrill said
				console.log("SUCCESS", response);
			}
		});
	}
});
