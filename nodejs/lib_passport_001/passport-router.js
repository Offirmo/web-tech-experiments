'use strict';

var _ = require('lodash');
var express = require('express');
var passport = require('passport');

/////////////////////////////////////////////

var router = module.exports = new express.Router();

/////////////////////////////////////////////

// http://passportjs.org/docs/overview

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
