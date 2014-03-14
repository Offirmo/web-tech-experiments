network-constants.js
====================

[![Build Status](https://travis-ci.org/Offirmo/network-constants.js.png?branch=master)](https://travis-ci.org/Offirmo/network-constants.js)
[![NPM version](https://badge.fury.io/js/network-constants.png)](http://badge.fury.io/js/network-constants)
[![Bower version](https://badge.fury.io/bo/network-constants.js.png)](http://badge.fury.io/bo/network-constants.js)
[![Dependency Status](https://gemnasium.com/Offirmo/network-constants.js.png)](https://gemnasium.com/Offirmo/network-constants.js)
[![Project status](http://img.shields.io/badge/project_status-stable_and_active-brightgreen.png)](http://offirmo.net/classifying-open-source-projects-status/)
[![license](http://img.shields.io/badge/license-public_domain-brightgreen.png)](http://unlicense.org/)
[![Code Climate](https://codeclimate.com/github/Offirmo/network-constants.js.png)](https://codeclimate.com/github/Offirmo/network-constants.js)
[![status](https://sourcegraph.com/api/repos/github.com/Offirmo/network-constants.js/badges/status.png)](https://sourcegraph.com/github.com/Offirmo/network-constants.js)
[![Total views](https://sourcegraph.com/api/repos/github.com/Offirmo/network-constants.js/counters/views.png)](https://sourcegraph.com/github.com/Offirmo/network-constants.js)
[![Gittip](http://img.shields.io/gittip/Offirmo.png)](https://www.gittip.com/Offirmo/)

Introduction
------------

A clean declaration of network constants (only HTTP for now) for js programs.

Useful when developing network programs or if you want to use HTTP semantics (REST API).

Works in node.js + browser, AMD.

Full testsuite. No dependencies.

License : public domain (http://unlicense.org/)

Fell free to suggest and contribute.

Interesting reads :
http://en.wikipedia.org/wiki/List_of_HTTP_status_codes
http://www.codeshttp.com/  (us / french)
http://benramsey.com/blog/2009/02/http-status-100-continue-corrections/
http://benramsey.com/blog/2008/04/http-status-201-created-vs-202-accepted/
http://benramsey.com/blog/2008/05/http-status-204-no-content-and-205-reset-content/
http://benramsey.com/blog/2008/05/206-partial-content-and-range-requests/
http://benramsey.com/blog/2009/11/post-vs-put/

Usage
-----

```javascript
if (typeof define !== 'function') { var define = require('amdefine')(module); } // node only

define(
[
	'network-constants/http'
],
function(http_constants) {
	"use strict";

	console.log( http_constants.methods.get ); // "GET"
	console.log( http_constants.status_codes.status_400_client_error_bad_request ); // 400
	console.log( http_constants.status_messages[404] ); // "Not Found"
	...
```

Installation
------------

Bower : `bower install network-constants.js`
Npm : `npm install network-constants`

Unit tests
----------

Browser : open test_runner/mocha.html
Node : `npm test`
