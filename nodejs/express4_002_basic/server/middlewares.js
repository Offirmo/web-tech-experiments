'use strict';



module.exports = {

	// wraps handling into a domain
	// https://github.com/expressjs/domain-middleware
	using_domains: require('domain-middleware'),


	logging: require('morgan'),

	// https://github.com/expressjs/serve-favicon
	// (static-favicon is an alias)
	serving_favicon: require('serve-favicon'),

	//var method_unifier = require('method-override'); // https://github.com/expressjs/method-override

	//var bodyParser = require('body-parser'); // for, well, parsing body.
	// mainly useful for REST (POST, PUT)
	// https://github.com/expressjs/body-parser


	// https://github.com/expressjs/serve-static
	serving_static_files: require('express').static,

	// https://github.com/expressjs/serve-index
	serving_directory_listing: require('serve-index'),

	// adds a X-Response-Time header to responses.
	// https://github.com/expressjs/response-time
	adding_XResponseTime_header: require('response-time'),


	// locale negotiation
	// https://github.com/jed/locale
	detecting_best_locale: require('locale'),

};
