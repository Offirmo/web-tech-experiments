#!/usr/bin/env node
'use strict';

console.log('Hello world !');

var FB = require('fb');



////////////////////////////////////////////////////////////////////////////////
var page_id = '...';
var app_id = '...';
var app_secret = '...';
var client_short_lived_access_token = '...';
var client_long_lived_access_token = '...';
// generated from app + user + page + rights
// cf. http://offirmo.net/wiki/index.php?title=Facebook#Obtention_d.27un_token_de_publication_.C3.A0_dur.C3.A9e_illimit.C3.A9e
var page_access_token = 'CAAJqZAZCjScZCIBAKtNfcIwT...';

FB.setAccessToken(page_access_token);


/////////////////////////////////////////////////////////////////////////////
console.log('FB options', FB.options());


/*
console.log('* Get facebook application access token');
FB.api('oauth/access_token', {
	client_id: app_id,
	client_secret: app_secret,
	grant_type: 'client_credentials'
}, function (res) {
	if(!res || res.error) {
		console.error(!res ? 'error occurred' : res.error);
		return;
	}

	console.log('  accessToken', res.access_token);
	console.log('  expires', res.expires ? res.expires : 0);
});
*/

/*
console.log('* Extend expiry time of a user access token');
FB.api('oauth/access_token', {
	client_id: app_id,
	client_secret: app_secret,
	grant_type: 'fb_exchange_token',
	fb_exchange_token: client_short_lived_access_token
}, function (res) {
	if(!res || res.error) {
		console.log(!res ? 'error occurred' : res.error);
		return;
	}

	console.log('  accessToken', res.access_token);
	console.log('  expires', res.expires ? res.expires : 0);
});
*/


// Exchange code (???) for access token
/*
FB.api('oauth/access_token', {
	client_id: app_id,
	client_secret: app_secret,
	redirect_uri: 'http://yoururl.com/callback',
	code: 'code'
}, function (res) {
	if(!res || res.error) {
		console.log(!res ? 'error occurred' : res.error);
		return;
	}

	console.log('accessToken', res.access_token);
	console.log('expires', res.expires ? res.expires : 0);
});
*/



// get
/*
FB.api(
	'/' + page_id + '/feed',
	function (response) {
		console.log(response);
		if (response && !response.error) {
			// handle the result
		}
	}
);
*/


console.log('* post to a page');
FB.api('/' + page_id + '/feed', 'post', { message: 'Hello bar from node.js !'}, function (res) {
	if(!res || res.error) {
		console.error(!res ? 'error occurred' : res.error);
		return;
	}
	console.log('Post Id: ' + res.id);
	console.log(res);
});

