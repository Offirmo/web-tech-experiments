#!/usr/bin/env node
'use strict';

// https://github.com/aadsm/jschardet

console.log('Hello world !');

var jschardet = require('jschardet');

// 'àíàçã' in UTF-8
console.log( jschardet.detect('\xc3\xa0\xc3\xad\xc3\xa0\xc3\xa7\xc3\xa3') );
// { encoding: 'utf-8', confidence: 0.9690625 }

// '次常用國字標準字體表' in Big5
console.log( jschardet.detect('\xa6\xb8\xb1\x60\xa5\xce\xb0\xea\xa6\x72\xbc\xd0\xb7\xc7\xa6\x72\xc5\xe9\xaa\xed') );
// { encoding: 'Big5', confidence: 0.99 }
