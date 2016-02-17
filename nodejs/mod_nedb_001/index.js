#!/bin/sh
':' //# http://sambal.org/?p=1014 ; exec /usr/bin/env node --harmony_destructuring "$0" "$@"
'use strict';

console.log('Hello world !');

////////////////////////////////////////////////////////////

const _ = require('lodash');
const async = require('async');

// https://github.com/louischatriot/nedb
const Datastore = require('nedb');

////////////////////////////////////////////////////////////

let db = new Datastore();

