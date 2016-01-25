'use strict';

var _ = require('lodash');
var express = require('express');

/////////////////////////////////////////////

var router = module.exports = new express.Router();

/////////////////////////////////////////////

router.get('/', function(req, res) {
	res.send('hello from sub-router !');
});
