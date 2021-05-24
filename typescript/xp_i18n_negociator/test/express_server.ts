#!/bin/sh
':' //# https://sambal.org/?p=1014 ; exec `dirname $0`/../../../node_modules/.bin/ts-node "$0" "$@"
'use strict'

////////////////////////////////////

import * as _ from 'lodash'
import * as express from 'express'
import * as cookie_parser from 'cookie-parser'

import { middleware as best_locales_middleware } from '../server/express_middleware'

import { BCP47Locale, ServerLocaleHints } from '../types'
import { normalize_and_validate_bcp47_locale } from '../utils'

////////////

var listening_port = process.env.PORT || 7000

////////////////////////////////////

process.on('uncaughtException', (err: Error) => {
	console.error(err)
	process.exit(1)
})
process.on('unhandledRejection', (reason: string, p: Promise<any>) => {
	console.error('Unhandled Rejection at: Promise', p, 'reason:', reason)
	process.exit(1)
})

////////////

var app = express()
app.use(cookie_parser())

////////////

app.get('/', (req, res) => {
	res.sendFile('index.html', { root: __dirname })
})
app.get('/client.js', (req, res) => {
	res.sendFile('client.js', { root: __dirname + '/..' })
})

app.get('/best-locales', best_locales_middleware)

app.get('/set-locale', (req, res) => {
	const locale: BCP47Locale | undefined = normalize_and_validate_bcp47_locale(req.query.lang)

	if (!locale) {
		res.status(400).send(`Illegal locale: "${req.query.lang}" !`)
		return
	}

	res.cookie('user-explicitly-selected-locale', locale, {
		expires: new Date(Date.now() + 2 * 365 * 24 * 3600 * 1000),
		httpOnly: true,
	})

	res.status(200).send('Done')
})

////////////////////////////////////

// https://stackoverflow.com/questions/3653065/get-local-ip-address-in-node-js
// https://nodejs.org/api/os.html#os_os_networkinterfaces
var local_ips = _.chain(require('os').networkInterfaces())
	.values()
	.flatten()
	.map('address')
	.value()

_.forEach(local_ips, function(ip) {
	console.log('Listening on http://' + ip + ':' + listening_port)
});
console.log('(Ctrl+C to stop)')

app.listen(listening_port);

////////////////////////////////////
