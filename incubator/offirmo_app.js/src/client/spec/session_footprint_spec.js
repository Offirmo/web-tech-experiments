if (typeof define !== 'function') { var define = require('amdefine')(module); }

define(
[
	'chai',

	'generic_store/generic_store', // to create test stores
	'offirmo_app/common/session',
	'offirmo_app/common/identity',
	'offirmo_app/client/session_footprint',

	'mocha'
],
function(chai, GenericStore, Session, Identity, CUT) {
	"use strict";

	var expect = chai.expect;
	chai.should();
	chai.Assertion.includeStack = true; // defaults to false


	describe('Offirmo App Session Footprint', function() {


		describe('instantiation', function() {

			it('should work', function() {
				var store = GenericStore.make_new("memory");
				var out = CUT.get_instance(store);

				out.should.exist;
				out.should.be.an('object');
			});

			it('should set default values', function() {
				var store = GenericStore.make_new("memory");
				var out = CUT.get_instance(store);

				expect( out.attributes).to.deep.equals({
					serialization_version     : CUT.constants.latest_serialization_version,
					ug_serialization_version  : undefined,

					ug_last_session_id        : undefined,
					ug_last_session_auth_data : undefined,
					ug_last_user_login        : undefined,
					ug_last_identity          : undefined,
					ug_last_avatar_url        : undefined
				});
			});

			it('should retrieve existing values', function() {
				var store = GenericStore.make_new("memory");

				// pre-fill the store with data
				store.set(CUT.constants.keys.ug_serialization_version,  CUT.constants.latest_serialization_version);
				store.set(CUT.constants.keys.ug_last_session_id,        5678);
				store.set(CUT.constants.keys.ug_last_session_auth_data, "123456789ABCDEF");
				store.set(CUT.constants.keys.ug_last_user_login,        "toto@toto.com");
				store.set(CUT.constants.keys.ug_last_identity,          "Toto");
				store.set(CUT.constants.keys.ug_last_avatar_url,        "http://www.toto.com/me.png");

				var out = CUT.get_instance(store);
				expect( out.attributes).to.deep.equals({
					serialization_version     : CUT.constants.latest_serialization_version,
					ug_serialization_version  : CUT.constants.latest_serialization_version,
					ug_last_session_id        : 5678,
					ug_last_session_auth_data : "123456789ABCDEF",
					ug_last_user_login        : "toto@toto.com",
					ug_last_identity          : "Toto",
					ug_last_avatar_url        : "http://www.toto.com/me.png"
				});
			});

			it('should retrieve session, account and identity', function() {
				var store = GenericStore.make_new("memory");

				// pre-fill the store with data
				store.set(CUT.constants.keys.ug_serialization_version,  CUT.constants.latest_serialization_version);
				store.set(CUT.constants.keys.ug_last_session_id,        5678);
				store.set(CUT.constants.keys.ug_last_session_auth_data, "123456789ABCDEF");
				store.set(CUT.constants.keys.ug_last_identity,          "Toto");
				store.set(CUT.constants.keys.ug_last_avatar_url,        "http://www.toto.com/me.png");

				var out = CUT.get_instance(store);

				var session = out.get_session();
				expect( session.id ).to.equals(5678);
				// that's all

				var identity = out.get_identity();
				expect( identity.attributes ).to.have.property('username',   "Toto");
				expect( identity.attributes ).to.have.property('avatar_url', "http://www.toto.com/me.png");
			});

			it('should handle different serialization version');
		}); // describe feature

		describe('utilities', function() {

			it('should allow full reset');
			it('should allow prefix usage');

		}); // describe feature

	}); // describe CUT
}); // requirejs module
