'use strict';

var _ = require('lodash');
var express = require('express');
var passport = require('passport');

/////////////////////////////////////////////

var router = module.exports = new express.Router();

/////////////////////////////////////////////

// http://passportjs.org/docs/overview

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
<form>
<input type="text" />
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
