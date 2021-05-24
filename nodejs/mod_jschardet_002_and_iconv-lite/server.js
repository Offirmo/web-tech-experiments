#!/usr/bin/env node
'use strict';

// https://github.com/aadsm/jschardet

console.log('Hello world !');

var jschardet = require('jschardet');
var iconv = require('iconv-lite');



// https://forums.devshed.com/javascript-development-115/convert-string-hex-674138.html
function toSemiHex(str) {
	var hex = '';
	for(var i=0; i<str.length; i++) {
		if(str.charCodeAt(i) <= 128)
			hex += ''+str[i];
		else
			hex += '\\'+str.charCodeAt(i).toString(16);
	}
	return hex;
}



function import_text(raw_text) {
	console.log('raw text         : "' + raw_text + '"');
	console.log('binary           : "' + toSemiHex(raw_text) + '"');
	var chardet = jschardet.detect(raw_text); // { encoding: '...', confidence: 0.xyz }
	console.log('detection result :', chardet);
	var converted_text = iconv.decode(raw_text, chardet.encoding);
	console.log('text             : "' + converted_text + '"');
	return converted_text;
}

// 'àíàçã' in UTF-8
import_text('\xc3\xa0\xc3\xad\xc3\xa0\xc3\xa7\xc3\xa3');

// '次常用國字標準字體表' in Big5
import_text('\xa6\xb8\xb1\x60\xa5\xce\xb0\xea\xa6\x72\xbc\xd0\xb7\xc7\xa6\x72\xc5\xe9\xaa\xed');

// empty !
import_text('');

// basic
import_text('Francois');
import_text('François');
import_text('Fran�ois ���� byline');
