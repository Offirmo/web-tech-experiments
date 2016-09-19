'use strict'

import * as _ from 'lodash'
import * as express from 'express'

import { BCP47Locale, ServerLocaleHints } from '../types'
import { normalize_and_validate_bcp47_locale } from '../utils'


function parse_HTTP_ACCEPT_LANGUAGE(raw: string) {
	//https://github.com/jshttp/negotiator/blob/master/lib/language.js
	return _.compact(
		raw.split(',')
			.map((entry: string) => entry.split(';')[0])
			.map(normalize_and_validate_bcp47_locale)
	) as BCP47Locale[]
}

// should have param "supported languages"
function middleware(req: express.Request, res: express.Response) {

	console.log(req.cookies)

	const server_hints: ServerLocaleHints = {

		from_explicitly_set_cookie:
			normalize_and_validate_bcp47_locale(req.cookies['user-explicitly-selected-locale']),

		from_url_query_string_lang:
			normalize_and_validate_bcp47_locale(req.query.lang),

		from_header_HTTP_ACCEPT_LANGUAGE:
			parse_HTTP_ACCEPT_LANGUAGE(req.headers['accept-language']),

		from_ip_geolocation:
			undefined
	}

	const seen_params = {}
	const result = {}

	/*
	 // facebook crawler. We want to do well in facebook graph isn't it ?
	 var facebook_explicit;

	 // manual user choice
	 var cookie_explicit; // see https://github.com/expressjs/cookie-parser

	 // eventually, guess from environment

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
	 */


	res.send({
		data: {
			seen_params,
			server_hints,
			result
		},
		meta: {

		}
	})
}

export {
	middleware
}
