extended-exceptions.js
======================

[![Build Status](https://travis-ci.org/Offirmo/extended-exceptions.js.png?branch=master)](https://travis-ci.org/Offirmo/extended-exceptions.js)
[![NPM version](https://badge.fury.io/js/extended-exceptions.png)](http://badge.fury.io/js/extended-exceptions)
[![Bower version](https://badge.fury.io/bo/extended-exceptions.js.png)](http://badge.fury.io/bo/extended-exceptions.js)
[![Dependency Status](https://gemnasium.com/Offirmo/extended-exceptions.js.png)](https://gemnasium.com/Offirmo/extended-exceptions.js)
[![Project status](http://img.shields.io/badge/project_status-stable_and_active-brightgreen.png)](http://offirmo.net/classifying-open-source-projects-status/)
[![license](http://img.shields.io/badge/license-public_domain-brightgreen.png)](http://unlicense.org/)
[![graph status](https://sourcegraph.com/api/repos/github.com/Offirmo/extended-exceptions.js/badges/status.png)](https://sourcegraph.com/github.com/Offirmo/extended-exceptions.js)
[![Code Climate](https://codeclimate.com/github/Offirmo/extended-exceptions.js.png)](https://codeclimate.com/github/Offirmo/extended-exceptions.js)
[![Total views](https://sourcegraph.com/api/repos/github.com/Offirmo/extended-exceptions.js/counters/views.png)](https://sourcegraph.com/github.com/Offirmo/extended-exceptions.js)
[![Gittip](http://img.shields.io/gittip/Offirmo.png)](https://www.gittip.com/Offirmo/)

Introduction
------------

Allow easy declaration of custom javascript errors/exceptions.

Also provides common exceptions for Javascript that are missing in the standard : RuntimeError, NotImplementedError,
InvalidArgument, OutOfRange, etc. (inspiration taken from the C++11 standard)

Works in node.js + browser, AMD.

Full testsuite. No dependencies.

Includes special workarounds for Firefox "Error" object which has sometimes a strange behaviour.

License : public domain (http://unlicense.org/)

Interesting reads :
- http://dailyjs.com/2014/01/30/exception-error/
- http://en.cppreference.com/w/cpp/error/exception


Predefined errors
-----------------

Note : we keep the "error" naming scheme of standard javascript.

```
Error (standard)  <-- javascript root exception
+ EvalError       <-- Vanilla javascript exceptions
+ RangeError      <-- ...
+ ReferenceError  <-- ...
+ SyntaxError     <-- ...
+ TypeError       <-- ...
+ URIError        <-- ...
+ ExtendedError   <-- Here start our custom exceptions
  + LogicError
    + InvalidArgument
    + LengthError
    + OutOfRange
    + InvariantNotMet
  + RuntimeError
    + NotImplemented
    + UnknownEnumValue
    + IllegalState
```


Usage
-----

```javascript
if (typeof define !== 'function') { var define = require('amdefine')(module); } // node only

define(
[
	'extended-exceptions'
],
function(EE) {
	"use strict";

	// Feature 1 - use one of the predefined errors
	throw new EE.NotImplemented("TODO !");
	throw new EE.InvalidArgument("Please !");
```

Defining our own exceptions inheriting from an existing one :

```javascript
define(
[
	'extended-exceptions'
],
function(EE) {
	"use strict";

	// Feature 2 - create a brand new error
	// inheriting from (for example) RuntimeError (could be just Error)
	var CustomJsonSerializationError = EE.create_custom_error("CustomError", EE.RuntimeError);

	// Alternative 1 - use it directly
	throw new CustomJsonSerializationError("Oups !");

	// Alternative 2 - use it to cast an existing error
	try {
		JSON.parse(stuff);
	}
	catch(e) {
		throw new CustomJsonSerializationError(e); // new error will have same stack and message
	}

	...
	
	console.log( caught_error.name );
	console.log( caught_error.message );
	console.log( caught_error.stack );
```

Catching and testing exceptions :
- exactly as you expect it.


Works in chai exactly as you expect it :
```javascript
if (typeof define !== 'function') { var define = require('amdefine')(module); } // node only

define(
[
	'chai',
	'<class under test>',
	'extended-exceptions',
	'mocha'
],
function(chai, CUT, EE) {
	"use strict";

	var expect = chai.expect;
	chai.should();

	describe('Nice stuff', function() {

		describe('processing', function() {

			it('should detect bad state', function() {
				var out = CUT.make_new();

				var tempfn = function() { out.dostuff(); };
				tempfn.should.throw(EE.IllegalStateError, "Not initialized !"); // works fine
			});
		}); // describe feature
	}); // describe CUT
}); // requirejs module
```

Installation
------------

Bower : `bower install extended-exceptions.js`
Npm : `npm install extended-exceptions`

Unit tests
----------

Browser : open `test_runner/mocha.html`
Node : `npm test`
