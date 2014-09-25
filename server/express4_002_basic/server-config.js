'use strict';

var _ = require('lodash');

var defaults = {
	env: 'development',
	listening_port: 3000,
	kill_timeout_s: 30,  //< max time we give ourselves to shutdown
};

var dynamic = {
	env: process.env.NODE_ENV,
	listening_port: process.env.PORT,
};

module.exports = _.merge({}, defaults, dynamic);
