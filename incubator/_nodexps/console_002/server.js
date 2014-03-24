#!/usr/bin/env node
'use strict';

console.log('Hello world !');

// http://forums.devshed.com/javascript-development-115/convert-string-hex-674138.html
function toHex(str) {
	var hex = '';
	for(var i=0; i<str.length; i++) {
		hex += '' + str.charCodeAt(i).toString(16);
	}
	return hex;
}

function toAscii(str) {
	var out = '';
	for(var i=0; i<str.length; i++) {
		if(str.charCodeAt(i) > 128) {
			//out += '\\' + str.charCodeAt(i).toString(16);
			out += '[' + str.charCodeAt(i).toString(16) + ']';
		}
		else
			out += str[i];
	}
	return out;
}

console.log( toHex('Déjà vu ça !') );
console.log( toAscii('Déjà vu ça !') );
