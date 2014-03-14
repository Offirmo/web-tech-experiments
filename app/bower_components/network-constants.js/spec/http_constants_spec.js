if (typeof define !== 'function') { var define = require('amdefine')(module); }

define(
[
	'chai',
	'network-constants/http',
	'mocha'
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
					if(   err_msg === 'TypeError: "status_500_server_error_internal_error" is read-only'
					   || err_msg === "TypeError: Cannot assign to read only property 'status_500_server_error_internal_error' of #<Object>") {
						// fine
					}
					else {
						//err_msg.should.equal("TypeError: Cannot assign to read only property \'status_500_server_error_internal_error\' of #<Object>");
						err_msg.should.equal('"status_500_server_error_internal_error" is read-only');
					}
				}
			});

		});

		describe('methods', function() {

			it('should be available', function() {
				// at last
				CUT.methods.should.include.keys('get', 'put', 'post', 'delete');
			});

		}); // describe feature



		describe('status codes', function() {

			it('should be available', function() {
				var values = [];
				for(var code in CUT.status_codes) {
					values.push(CUT.status_codes[code]);
				}
				// at last those most used one
				values.should.include.members([100, 200, 400, 404, 500, 501]);
			});

			it('should be correct', function() {
				for(var code_name in CUT.status_codes) {
					// value should be a number
					CUT.status_codes[code_name].should.be.a.number;
					CUT.status_codes[code_name].should.to.be.within(100, 599);
				}
			});


		}); // describe feature



		describe('status messages', function() {

			it('should be available for each status code', function() {
				for(var code_name in CUT.status_codes) {
					var code = CUT.status_codes[code_name];
					CUT.status_messages.should.include.keys(code.toString());
					CUT.status_messages[code].should.be.a.string;
				}
			});



		}); // describe feature

	});
});
