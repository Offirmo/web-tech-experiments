'use strict';

var express = require('express');

// https://expressjs.com/4x/api.html
var app = express();

module.exports = app;


// templating
var consolidated_templates = require('consolidate'); // always needed
// now require all templating engines we wish to use
var dust = require('dustjs-linkedin'); // https://dejanglozic.com/2014/01/27/dust-js-such-templating/
dust.optimizers.format = function(ctx, node) { return node }; // https://github.com/linkedin/dustjs/wiki/Dust-Tutorial#controlling-whitespace-suppression
app.engine('dust', consolidated_templates.dust); // .dust will be rendered with...

// default template engine
app.set('view engine', 'dust'); // default extension to use when omitted

// views directory : default to /views
app.set('views', 'server/views'); // default extension to use when omitted


// Because you're the type of developer who cares about this sort of thing!
app.enable('strict routing'); // default false, TODO combine with https://github.com/ericf/express-slash
app.enable('case sensitive routing'); // default false
app.disable('x-powered-by'); // default true

// REM : app.locals includes settings
//var prettyjson = require('prettyjson');
//console.log('app.locals :\n', prettyjson.render(app.locals));

// to review : for running behind nginx or equiv.
//app.enable('trust proxy');

/*app.configure('development', function() {
 var edt = require('express-debug'); // https://github.com/devoidfury/express-debug
 edt(app, {
 // settings
 });
 });*/


/*
 var errorhandler = require('errorhandler'); // https://github.com/expressjs/errorhandler
 if (config.env === 'development') {
 app.use(errorhandler());
 }*/


