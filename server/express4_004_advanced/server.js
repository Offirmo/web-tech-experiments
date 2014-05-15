#!/usr/bin/env node
'use strict';
TODO

var compressible = require('compressible'); // https://github.com/expressjs/compressible
var compress = require('compression'); // https://github.com/expressjs/compression

app.use(compress());

compressible('text/html') // => true

// https://github.com/expressjs/parseurl
