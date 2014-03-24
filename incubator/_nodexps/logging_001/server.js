#!/usr/bin/env node
'use strict';

var log = require('../logger');
var prettyjson = require('prettyjson');

console.log('Hello world !');


var error = new Error('something broke');
error.inner = new Error('some inner thing broke');
error.code = '500c';
error.severity = 'high';

var prettyjson_error_render_config = {

};

var fullError = JSON.parse(JSON.stringify(error));
var message = prettyjson.render(fullError, prettyjson_error_render_config);
console.error(message);


console.log(error);
