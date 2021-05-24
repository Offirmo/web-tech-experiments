#!/usr/bin/env node
'use strict';

TODO

var compressible = require('compressible'); // https://github.com/expressjs/compressible
var compress = require('compression'); // https://github.com/expressjs/compression

app.use(compress());

compressible('text/html') // => true

// https://github.com/expressjs/parseurl
// https://github.com/expressjs/csurf
// https://github.com/expressjs/cookies
// https://github.com/expressjs/path-match
// https://github.com/expressjs/serve-index
// https://github.com/expressjs/domain-middleware
// https://github.com/brianc/node-okay
// https://stackoverflow.com/questions/14080887/centralizing-error-handling-in-an-express-js-based-app
// https://github.com/expressjs/restful-router
// https://github.com/expressjs/timeout
// https://github.com/floatdrop/express-error-with-sources

// interesting but later, just in case
// utilities
// https://github.com/expressjs/mime-types
// https://github.com/expressjs/type-is  internally used by express4, req.is
// https://github.com/expressjs/statuses
// MW
// https://github.com/expressjs/proxy-addr
// seems this one is already integrated : https://github.com/expressjs/resolve-path
// https://github.com/expressjs/connect-markdown
