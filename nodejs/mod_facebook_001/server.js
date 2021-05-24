#!/usr/bin/env node
'use strict';

console.log('Hello world !');

var FB = require('fb'); // https://github.com/Thuzi/facebook-node-sdk/
// +API https://developers.facebook.com/docs/graph-api/reference/v2.3/post#publishing


////////////////////////////////////////////////////////////////////////////////
//var page_id = '...';
var app_id = '...';
var app_secret = '...';
var client_short_lived_access_token = '...';
var client_long_lived_access_token = '...';
// generated from app + user + page + rights
// cf. https://offirmo.net/wiki/index.php?title=Facebook#Obtention_d.27un_token_de_publication_.C3.A0_dur.C3.A9e_illimit.C3.A9e
//var page_access_token = '...';

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
	redirect_uri: 'https://yoururl.com/callback',
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

/*
console.log('* post to a page');
FB.api('/' + page_id + '/feed', 'post', { message: 'Hello again from node.js !'}, function (res) {
	if(!res || res.error) {
		console.error(!res ? 'error occurred' : res.error);
		return;
	}
	console.log('  Post Id: ' + res.id);
	console.log(res);
});
*/

/*
console.log('* post to a page, v2');
FB.api(
	'/' + page_id + '/feed',
	'post',
	{
		link: 'https://www.metronews.fr/blog/bigbugblog/2011/05/09/votez-pour-le-chaton-le-plus-mignon/',
		message: 'Meow from node.js !'
	},
	function (res) {
	if(!res || res.error) {
		console.error(!res ? 'error occurred' : res.error);
		return;
	}
	console.log('  Post Id: ' + res.id);
	console.log(res);
});
*/


console.log('* post to a page, v3');
FB.napi(
	'/' + page_id + '/feed',
	'post',
	{
		icon: 'https://d30y9cdsu7xlg0.cloudfront.net/png/6985-200.png',
		picture: 'https://colourfulrebel.com/en/wp-content/uploads/2015/06/Cute-Kittens-1-Wallpaper-HD.jpg',
		link: 'https://www.metronews.fr/blog/bigbugblog/2011/05/09/votez-pour-le-chaton-le-plus-mignon/',
		message: 'status message',
		caption: 'caption',
		description: 'description',
		name: 'link name',
	},
	function (error, response) {
		if(error) {
			if(error.response.error.code === 'ETIMEDOUT') {
				console.log('  request timeout !');
			}
			else {
				console.log('  error', error.message);
			}
			return;
		}

		console.log('  Post Id: ' + response.id);
		console.log(response);
	}
);


/*
console.log('* post to a page, v3');
FB.napi(
	'/' + page_id + '/feed',
	'post',
	{
		link: 'https://www.metronews.fr/blog/bigbugblog/2011/05/09/votez-pour-le-chaton-le-plus-mignon/',
		message: 'a loooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooong loooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooong loooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooong loooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooong loooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooong loooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooong loooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooong loooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooong loooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooong loooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooong status message',
		// limit 1000 bytes 2015/06/24
		caption: 'a loooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooong loooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooong caption',
		description: 'a loooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooong loooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooong loooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooong loooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooong loooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooong loooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooong loooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooong loooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooong loooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooong loooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooong description',
		// limit 255 bytes 2015/06/24
		name: 'oooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo' + 'oooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo' +'ooooooooooooooooooooooooooooooooooooooooooooooooooooooâ',
	},
	function (error, response) {
		if(error) {
			if(error.response.error.code === 'ETIMEDOUT') {
				console.log('  request timeout !');
			}
			else {
				console.log('  error', error.message);
			}
			return;
		}

		console.log('  Post Id: ' + response.id);
		console.log(response);
	}
);
*/




/*
TODO timeout
TODO node style
*/
