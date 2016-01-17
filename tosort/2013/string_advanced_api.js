if (typeof define !== 'function') { var define = require('amdefine')(module); }

define(function() {
	"use strict";

	// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/startsWith?redirectlocale=en-US&redirectslug=JavaScript%2FReference%2FGlobal_Objects%2FString%2FstartsWith#See%20also
	if (!String.prototype.startsWith) {
		Object.defineProperty(String.prototype, 'startsWith', {
			enumerable: false,
			configurable: false,
			writable: false,
			value: function (searchString, position) {
				position = position || 0;
				return this.indexOf(searchString, position) === position;
			}
		});
	}

	// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/endsWith?redirectlocale=en-US&redirectslug=JavaScript%2FReference%2FGlobal_Objects%2FString%2FendsWith#Polyfill
	if (!String.prototype.endsWith) {
		Object.defineProperty(String.prototype, 'endsWith', {
			enumerable: false,
			configurable: false,
			writable: false,
			value: function (searchString, position) {
				position = position || this.length;
				position = position - searchString.length;
				return this.lastIndexOf(searchString) === position;
			}
		});
	}

	return {};
}); // requirejs module
