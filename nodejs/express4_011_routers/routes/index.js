'use strict';

// http://offirmo.net/wiki/index.php?title=Express.js
// http://expressjs.com/4x/api.html

var _ = require('lodash');
var express = require('express');

/////////////////////////////////////////////

var sub_router = require('./sub-router');
var meta_router = require('../../--mini_incubator/meta-routes');

/////////////////////////////////////////////

var router = module.exports = new express.Router();

/////////////////////////////////////////////

router.get('/', function(req, res) {
	res.send(`
<!DOCTYPE html>
<head>
	<title>advanced routing</title>
	<style type="text/css">
		body {
			margin: 40px;
			font-family: "Lucida Sans Unicode", "Lucida Grande", sans-serif;
			color: #333;
		}
	</style>
</head>

<h1>...</h1>
<li><a>${req.baseUrl}/router</a>
<li><a>${req.baseUrl}/meta</a>

<script>
	document.querySelector('h1').textContent = document.title;
	Array.prototype.forEach.call(document.querySelectorAll('a'), function(el) {
		el.href || (el.href = el.text);
	});
</script>
	`);
});

router.use('/router', sub_router);
router.use('/meta', meta_router);
