#!/usr/bin/env node
'use strict';

const google = require('googleapis')
const googleAuth = require('google-auth-library')
const sheets = google.sheets('v4')

//const oauth2 = require('../google_oauth2.json')

var authFactory = new googleAuth();
//var oauth2Client = new auth.OAuth2(oauth2.client_id, oauth2.client_secret, redirectUrl);

google.auth.getApplicationDefault(function(err, authClient) {
	if (err)
		return console.log('getApplicationDefault returned an error', err);


	sheets.spreadsheets.values.get({
		auth: authClient,
		spreadsheetId: '1hBMZlf6Yy84CSCUUU6ZIdpCJ005YrtA68-k8Tc99vyg',
		range: 'data!A2:E6',
	}, (err, response) => {
		if (err) {
			console.log('The API returned an error: ' + err);
			return;
		}
		var rows = response.values;
		if (rows.length == 0) {
			console.log('No data found.');
		} else {
			console.log(rows);
		}
	})
})



/*
https://sheets.googleapis.com/v4/spreadsheets/1hBMZlf6Yy84CSCUUU6ZIdpCJ005YrtA68/values/data!A1:D5

	https://docs.google.com/spreadsheets/d/1hBMZlf6Yy84CSCUUU6ZIdpCJ005YrtA68-k8Tc99vyg/pubhtml


		https://sheets.googleapis.com/v4/spreadsheets/1hBMZlf6Yy84CSCUUU6ZIdpCJ005YrtA68-k8Tc99vyg/values/data!A1:D5

 https://sheets.googleapis.com/v4/spreadsheets/{spreadsheetId}/values/{range}
*/
