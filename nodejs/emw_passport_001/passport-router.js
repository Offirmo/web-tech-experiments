'use strict';

var _ = require('lodash');
var express = require('express');
var passport = require('passport');
var passport_strategy_local = require('./passport-strategy-local');

/////////////////////////////////////////////

var router = module.exports = new express.Router();

/////////////////////////////////////////////

// https://passportjs.org/docs/overview

passport.use(passport_strategy_local); // "local"

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
email : <input type="email" name="email" value="a@b.c" /><br/>
Password : <input type="password" name="password" value="12345" /><br/>
<input type="submit" value="Login" />
</form>

<script>
	document.querySelector('h1').textContent = document.title;
	Array.prototype.forEach.call(document.querySelectorAll('a'), function(el) {
		el.href || (el.href = el.text);
	});
</script>
	`);
});

router.get('/profile', (req, res) => {
	res.send(`
<!DOCTYPE html>
<head>
	<title>lib_passport_001 - profile</title>
	<style type="text/css">
		body {
			margin: 40px;
			font-family: "Lucida Sans Unicode", "Lucida Grande", sans-serif;
			color: #333;
		}
	</style>
</head>

<h1>...</h1>
TODO profile

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
		session: false,
		successRedirect: '/profile',
		failureRedirect: '/login',
		failureFlash: true,
		successFlash: true // 'Welcome!'
	}),
	function on_auth_success_mw(req, res) {
		console.log('/on_auth_success_mw');
		// XXX this MW will never be called if option successRedirect
		// If this function gets called, authentication was successful.
		// `req.user` contains the authenticated user.
		res.redirect('/users/' + req.user.email);
	}
);

router.post('/login-custom', (req, res, next) => {
	console.log('/login-custom');
	passport.authenticate(
		// strategy, options, callback
		'local',
		{
			//session: false, XXX no effect, see https://stackoverflow.com/a/26744089/587407
			successRedirect: '/profile',
			failureRedirect: '/login',
			//failureFlash: true, XXX no effect when using a post_auth_custom_callback
			//successFlash: true // 'Welcome!'
		},
		function post_auth_custom_callback(err, user, info) {
			// https://passportjs.org/docs/authenticate
			console.log('post_auth_custom_callback', err, user, info);

			if (err) return next(err);
			if (!user) return res.redirect('/login');

			req.logIn(user, { session: false }, function (err) {
				if (err) return next(err);

				return res.redirect('/users/' + user.username);
			});
		}
	)(req, res, next);
});


// generic error MW
router.use(function logErrors(err, req, res, next) {
	console.error('passport-router error :', err.stack);
	next(err);
});
