/* Top spec on how to use offirmo app
 */
if (typeof define !== 'function') { var define = require('amdefine')(module); }


define(
[
	'chai',
	'underscore',

	'offirmo_app/common/identity',
	'offirmo_app/common/account',

	'mocha'
],
function(chai, _, CUT, Account) {
	"use strict";

	var expect = chai.expect;
	chai.should();
	chai.Assertion.includeStack = true; // defaults to false



	describe('Offirmo App Identity', function() {


		describe('instantiation', function() {

			it('should work', function() {
				var out = CUT.make_new();
				out.should.exist;
				out.should.be.an('object');
			});

			it('should set default values', function() {
				var out = CUT.make_new();

				expect( out.attributes).to.deep.equal({
					serialization_version: CUT.constants.latest_serialization_version,

					sg_account_id     : undefined,
					username          : "You",
					sg_differentiator : undefined,
					enabled_apps      : []
				});

				expect( out.id).to.be.undefined;
			});

			it('should usually be done by an account', function() {
				var account = Account.make_new({email: "toto@toto.com"});
				account.id = "AC001";
				var out = account.create_identity({username: "Toto"});

				expect( out.attributes).to.deep.equal({
					serialization_version: CUT.constants.latest_serialization_version,

					sg_account_id     : "AC001",
					username          : "Toto",
					sg_differentiator : undefined,
					enabled_apps      : []
				});

				expect( out.id).to.be.undefined;
			});

		});


		describe('denomination', function() {

			it('should be available in non-unique mode', function() {
				var out1 = CUT.make_new({username: "Toto"});
				expect( out1.get_denomination() ).to.equal("Toto");
				var out2 = CUT.make_new({username: "Toto", differentiator: 2});
				expect( out2.get_denomination() ).to.equal("Toto");
			});

			it('should be available in unique mode', function() {
				var out1 = CUT.make_new({username: "Toto"});
				expect( out1.get_unique_denomination() ).to.equal("Toto");
				var out2 = CUT.make_new({username: "Toto", differentiator: 2});
				expect( out2.get_unique_denomination() ).to.equal("Toto 2");
			});

		});

	}); // describe CUT
}); // requirejs module
