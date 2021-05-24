#!/bin/sh
':' //# https://sambal.org/?p=1014 ; exec /usr/bin/env node --harmony_destructuring "$0" "$@"
'use strict';

console.log('Hello world !');

////////////////////////////////////////////////////////////

//const _ = require('lodash');
//const async = require('async');
//const fetch = require('node-fetch');

// https://github.com/maxlath/wikidata-sdk
//const wdk = require('wikidata-sdk');
// https://github.com/maxlath/wikidata-token
const wdToken = require('wikidata-token');

//const Wikidata = require('../mod_wikidata_common');

////////////////////////////////////////////////////////////

const config = {username: 'Wikyvema', password: 'w1kyghj456'};
const getToken = wdToken(config);

getToken()
.then(data => console.log('token :', data));
