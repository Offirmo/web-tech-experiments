'use strict';

// http://expressjs.com/4x/api.html#app

var _ = require('lodash');
var express = require('express');


/////////////////////////////////////////////

var app = module.exports = express();

/////////////////////////////////////////////

app.get('/', function(req, res) {
	res.send('hello from sub-app !');
});
