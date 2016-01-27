'use strict';

var _ = require('lodash');
var PassportLocalStrategy = require('passport-local').Strategy;

/////////////////////////////////////////////

var local_strategy = module.exports = new PassportLocalStrategy({
		usernameField: 'email',
		//passwordField: 'passwd'
	},
	authentify);

/////////////////////////////////////////////

// http://passportjs.org/docs/username-password

const DB = {
	users: [{
		email: 'a@b.c',
		password: '12345' // XXX example, of course !!!
	}]
};

function authentify(email, password, done) {
	var user = _.find(DB.users, { // XXX example, of course !!!
		email: email,
		password: password
	});
	if (!user) return done(null, false, { message: 'Incorrect credentials !' });

	return done(null, user);
}

var local_strategy = new PassportLocalStrategy(authentify);
