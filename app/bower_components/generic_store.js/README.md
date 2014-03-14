generic_store.js
================

[![Build Status](https://travis-ci.org/Offirmo/generic_store.js.png?branch=master)](https://travis-ci.org/Offirmo/generic_store.js)
[![NPM version](https://badge.fury.io/js/generic_store.png)](http://badge.fury.io/js/generic_store)
[![Bower version](https://badge.fury.io/bo/generic_store.js.png)](http://badge.fury.io/bo/generic_store.js)
[![status](https://sourcegraph.com/api/repos/github.com/Offirmo/generic_store.js/badges/status.png)](https://sourcegraph.com/github.com/Offirmo/generic_store.js)
[![Total views](https://sourcegraph.com/api/repos/github.com/Offirmo/generic_store.js/counters/views.png)](https://sourcegraph.com/github.com/Offirmo/generic_store.js)

STILL IN PROGRESS - MISSING FEATURES - API MAY CHANGE

Introduction
------------

generic_store.js wraps store.js and add :
- an implementation in memory for safe tests or other use
- an (optional) automatic key prefixing for avoiding conflicts (NOT IMPLEMENTED)

NOTE : ONLY set() AND get() ARE IMPLEMENTED FOR NOW !

User Story
----------

In you web app, you use the convenient local storage instead of fat cookies. Of course,
you use store.js (https://github.com/marcuswestin/store.js) to access the local storage.

Now there are two problems :
- it's unsafe to unit test your app since local storage is persistent and shared
- you may mess with another local storage user which use the same keys

Solution :
- Have a store.js implementation in memory for tests
- Have an automatic prefixing of keys

Usage
-----

```javascript
define(
[
	'generic_store/generic_store',
],
function(GenericStore) {
	"use strict";

	// new store, in memory, guaranteed to be empty
	var store1 = GenericStore.make_new("memory");
	// new store, in memory, guaranteed to be empty, different from the previous one
	var store2 = GenericStore.make_new("memory");
	// existing store (local storage), "existing" reminds us that it may already contain data
	var store3 = GenericStore.get_existing("local");

	// now use your store like store.js
	store.set('username', 'marcus');
	store.get('username');
	store.set('user', { name: 'marcus', likes: 'javascript' });

```

Installation
------------

Bower : `bower install generic_store.js`
Npm : `npm install generic_store`

Unit tests
----------

in the 'spec' folder. See also readme.txt in the 'test_runner' folder.
