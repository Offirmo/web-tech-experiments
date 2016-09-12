'use strict';

// http://stackoverflow.com/questions/1043339/javascript-for-detecting-browser-language-preference
// http://gu.illau.me/posts/the-problem-of-user-language-lists-in-javascript/

module.exports = localizer_factory;

var _ = require('lodash');

/**
 * Locale negotiator middleware.
 * Amongst supported locales, choose the best one for current user.
 * More advanced than other MW : Handles facebook, query string...
 */

function localizer_factory(supported_locales, options) {
	console.log('* Locale negotiator middleware : supported_locales =', supported_locales);
	if(! _.isArray(supported_locales)) throw new Error('localizer.js : supported_locales must be an array !');
	if(_.isEmpty(supported_locales)) throw new Error('localizer.js : supported_locales can’t be empty !');

	options = options || {};
	if(! _.isObject(options)) throw new Error('localizer.js : if defined, options must be an object !');
	var logger = options.logger || console;

	/** validate that given locale is a correct "BCP 47 locale code" and try to fix it if needed.
	 * returns undef if not valid.
	 */
	 function normalize_and_validate(locale) {
		if(! locale) return;
		if(! _.isString(locale)) return;
		if(! locale.length >= 2) return;

		// TODO more, one day ;-)

		return locale;
	}

	var supported_locale_validation_marker = supported_locales.length;
	supported_locales = _.compact(supported_locales.map(normalize_and_validate));
	if(supported_locales.length !== supported_locale_validation_marker)
		throw new Error('localizer.js : supported_locales must contain only BCP 47 locale codes !');

	function is_locale_supported(locale) {
		return _.findIndex(supported_locales, function(supported) {
				return supported === locale;
			}) !== -1;
	}

	//var system_locale = process.env.LANG || 'en_US';

	//logger.log('supported_locales :', supported_locales);

	return function (req, res, next) {

		// possible locales, in order of priority if found
		var query_explicit = normalize_and_validate(req.query.lang); //< should never be used except for demo/debug for fear a user bookmark it as is
		// facebook crawler. We want to do well in facebook graph isn't it ?
		var facebook_explicit;
		// manual user choice
		var cookie_explicit; // see https://github.com/expressjs/cookie-parser
		// eventually, guess from environment
		var brower_accepted = req.acceptsLanguages(supported_locales);
		var geolocalisation_inferred;

		if(query_explicit && is_locale_supported(query_explicit)) {
			req.locale = query_explicit;
			req.locale_choice = 'explicitely requested by querystring';
		}
		else if (facebook_explicit && is_locale_supported(facebook_explicit)) {
			req.locale = facebook_explicit;
			req.locale_choice = 'explicitely requested by facebook headers';
		}
		else if (cookie_explicit && is_locale_supported(cookie_explicit)) {
			req.locale = cookie_explicit;
			req.locale_choice = 'explicitely requested by the user cookie';
		}
		else if (brower_accepted && is_locale_supported(brower_accepted)) {
			req.locale = brower_accepted;
			req.locale_choice = 'best match with browser languages';
		}
		else {
			req.locale = supported_locales[0];
			req.locale_choice = 'no match and/or no info, defaulted to the first supported language';
		}

		//logger.log('localizer : picked "' + req.locale +'" (' + req.locale_choice + ')');

		return next();
	};
}
