'use strict';

var _ = require('lodash');
var PassportLocalStrategy = require('passport-local').Strategy;

/////////////////////////////////////////////

var local_strategy = module.exports = new PassportLocalStrategy(
	{
		usernameField: 'email',
		//passwordField: 'password'
	},
	verify
);

/////////////////////////////////////////////

// http://passportjs.org/docs/username-password

const DB = {
	users: [{
		email: 'a@b.c',
		password: '12345' // XXX example, of course !!!
	}]
};

function verify(email, password, done) {
	console.log('local_strategy verify', email, password);
	var user = _.find(DB.users, { // XXX example, of course !!!
		email: email,
		password: password
	});
	if (!user) return done(null, false, { message: 'Incorrect credentials !' });

	return done(null, user);
}
