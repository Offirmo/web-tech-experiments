'use strict';

var _ = require('lodash');
var express = require('express');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

/////////////////////////////////////////////

var router = module.exports = new express.Router();

/////////////////////////////////////////////

// http://passportjs.org/docs/overview

const DB = {
	users: [{
		email: 'a@b.c',
		password: '12345'
	}]
};


passport.use(new LocalStrategy(function(email, password, done) {
	var user = _.find(DB.users, {
		email: email,
		password: password
	});
	if (!user) return done(null, false, { message: 'Incorrect credentials !' });

	return done(null, user);
}));


router.get('/login', (req, res) => {
	res.send(`
<!DOCTYPE html>
<head>
	<title>lib_passport_001 - login</title>
	<style type="text/css">
		body {
			margin: 40px;
			font-family: "Lucida Sans Unicode", "Lucida Grande", sans-serif;
			color: #333;
		}
	</style>
</head>

<h1>...</h1>
<form action="login" method="post">
email : <input type="email" value="a@b.c" /><br/>
Password : <input type="password" value="xxx" /><br/>
<button type="submit">Login</button>
</form>

<script>
	document.querySelector('h1').textContent = document.title;
	Array.prototype.forEach.call(document.querySelectorAll('a'), function(el) {
		el.href || (el.href = el.text);
	});
</script>
	`);
});


router.post('/login',
	passport.authenticate('local',  {
		successRedirect: '/profile',
		failureRedirect: '/login',
		failureFlash: true,
		successFlash: true // 'Welcome!'
	}),
	(req, res) => {
		// If this function gets called, authentication was successful.
		// `req.user` contains the authenticated user.
		res.redirect('/users/' + req.user.username);
	}
);

router.post('/login-custom', (req, res, next) => {
	passport.authenticate('local', (err, user, info) => {
		console.error(err, user, info);

		if (err) return next(err);
		if (!user) return res.redirect('/login');

		req.logIn(user, function (err) {
			if (err) return next(err);

			return res.redirect('/users/' + user.username);
		});
	})(req, res, next);
});
