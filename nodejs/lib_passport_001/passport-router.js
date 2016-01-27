'use strict';

var _ = require('lodash');
var express = require('express');
var passport = require('passport');
var passport_strategy_local = require('./passport-strategy-local');

/////////////////////////////////////////////

var router = module.exports = new express.Router();

/////////////////////////////////////////////

// http://passportjs.org/docs/overview

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
Password : <input type="password" name="password" value="xxx" /><br/>
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
	passport.authenticate('local', function postAuthentCallback(err, user, info) {
		console.error(err, user, info);

		if (err) return next(err);
		if (!user) return res.redirect('/login');

		req.logIn(user, function (err) {
			if (err) return next(err);

			return res.redirect('/users/' + user.username);
		});
	})(req, res, next);
});
