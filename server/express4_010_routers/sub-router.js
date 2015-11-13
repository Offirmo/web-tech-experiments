'use strict';

// http://offirmo.net/wiki/index.php?title=Express.js
// http://expressjs.com/4x/api.html

var _ = require('lodash');
var express = require('express');


/////////////////////////////////////////////

var router = module.exports = new express.Router();

/////////////////////////////////////////////

router.get('/', function(req, res) {
	res.send('hello from sub-router !');
});
