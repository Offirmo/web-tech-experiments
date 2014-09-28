'use strict';

var _ = require('lodash');

var defaults = {
	env: 'development',
	listening_port: 3000,
	kill_timeout_s: 30,  //< max time we give ourselves to shutdown
	livereload_port: 35730, //< note : official default is 35729
	supported_locales: [ 'en', 'fr' ],
};

var dynamic = {
	env: process.env.NODE_ENV,
	listening_port: process.env.PORT,
};

module.exports = _.merge({}, defaults, dynamic);
