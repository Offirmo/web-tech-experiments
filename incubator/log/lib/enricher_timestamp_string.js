/**
 * Enricher which build a human readable, sortable time reprsentation
 * of the time of this log call.
 */

// if node.js : use amdefine (add it with npm)
if (typeof define !== 'function') { var define = require('amdefine')(module); }

define([
	'lodash'
],
function(_) {
	'use strict';

	function enrich_with_timestamp_string(log_call) {
		if(log_call.timestamp_string) return; // nothing to do, already there

		var d = log_call.date;

		var yyyy = d.getFullYear();
		var mm = d.getMonth();
		var dd = d.getDate();
		// These lines ensure you have two-digits
		if(mm < 10) mm = '0' + mm;
		if(dd < 10) dd = '0' + dd;

		var hh = d.getUTCHours();
		var mn = d.getUTCMinutes();
		var ss = d.getSeconds();
		var mss = d.getMilliseconds();
		// These lines ensure you have two-digits
		if(hh < 10) hh = '0' + hh;
		if(mm < 10) mm = '0' + mm;
		if(ss < 10) ss = '0' + ss;
		if(mss < 10) mss = '00' + mss;
		else if (mss < 100) mss = '0' + mss;

		log_call.timestamp_string = '' + yyyy + mm + dd
			+ ' ' + hh + ':' + mn + ':' + ss + '.' + mss;
	}

	return {
		// objects are created via a factory, more future-proof
		'make_new': function() { return enrich_with_timestamp_string; }
	};
});
