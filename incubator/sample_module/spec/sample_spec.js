if (typeof define !== 'function') { var define = require('amdefine')(module); }

define(
[
	'chai',
	'../lib/sample',
	'mocha'
],
function(chai, CUT) {
	'use strict';

	var expect = chai.expect;
	chai.config.includeStack = true; // turn on stack trace

	describe('sample module', function() {

		it('should do nothing', function() {
			CUT.should.exist;
			expect(CUT).to.not.throw(Error, "Can't process requests : this adapter is stopped.");
		});
	});
});
