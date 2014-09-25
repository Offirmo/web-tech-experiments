'use strict';

module.exports = {

	logging: require('morgan'),

	// https://github.com/expressjs/serve-favicon
	// (static-favicon is an alias)
	serving_favicon: require('serve-favicon'),

	//var method_unifier = require('method-override'); // https://github.com/expressjs/method-override

	//var bodyParser = require('body-parser'); // for, well, parsing body.
	// mainly useful for REST (POST, PUT)
	// https://github.com/expressjs/body-parser


	// https://github.com/expressjs/domain-middleware
	// supposedly better than connect-domain
	using_domains: require('domain-middleware'),

	// https://github.com/expressjs/serve-static
	serving_static_files: require('express').static
};
