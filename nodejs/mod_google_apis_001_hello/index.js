#!/usr/bin/env node
'use strict';

const { google } = require('googleapis');

// https://github.com/google/google-api-nodejs-client#oauth2-client

const oauth2Client = new google.auth.OAuth2(
	YOUR_CLIENT_ID,
	YOUR_CLIENT_SECRET,
	YOUR_REDIRECT_URL
);

// generate a url that asks permissions for Google+ and Google Calendar scopes
const scopes = [
	'https://www.googleapis.com/auth/plus.me',
	'https://www.googleapis.com/auth/calendar'
];

const url = oauth2Client.generateAuthUrl({
	// 'online' (default) or 'offline' (gets refresh_token)
	access_type: 'offline',

	// If you only need one scope you can pass it as a string
	scope: scopes
});

