if (typeof define !== 'function') { var define = require('amdefine')(module) }

define(
[
	'chai',
	'offirmo/utils/http_constants'
],
function(chai, CUT) {
	"use strict";

	var expect = chai.expect;
	chai.should();

	describe('HTTP constants', function() {

		describe('access', function() {

			it('should be direct', function() {
				var out = CUT;
				out.should.exist;
				out.should.be.an('object');
			});

			it('should be protected', function() {
				var out = CUT;

				try {
					out.status_codes.status_500_server_error_internal_error = 508;
				}
				catch(e) {
					var err_msg = e.toString();
					if(   err_msg === '"status_500_server_error_internal_error" is read-only'
					   || err_msg === "TypeError: Cannot assign to read only property \'status_500_server_error_internal_error\' of #<Object>") {
						// fine
					}
					else {
						err_msg.should.equal("TypeError: Cannot assign to read only property \'status_500_server_error_internal_error\' of #<Object>");
						//err_msg.should.equal('"status_500_server_error_internal_error" is read-only');
					}
				}
			});

		});

		describe('methods', function() {



		}); // describe feature

	});
});
