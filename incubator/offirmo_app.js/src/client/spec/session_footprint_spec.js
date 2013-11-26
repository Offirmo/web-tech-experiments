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
					serialization_version   : CUT.constants.latest_serialization_version,
					u_current_session_id    : undefined,
					u_last_user_id          : undefined,
					u_last_username         : undefined,
					u_serialization_version : undefined
				});
			});

			it('should retrieve existing values', function() {
				var store = GenericStore.make_new("memory");

				// pre-fill the store with data
				store.set(CUT.constants.keys.u_serialization_version, CUT.constants.latest_serialization_version);
				store.set(CUT.constants.keys.u_current_session_id,    1234);
				store.set(CUT.constants.keys.u_last_username,         "toto");
				store.set(CUT.constants.keys.u_last_user_id,          "toto@laposte.fr");

				var out = CUT.get_instance(store);
				expect( out.attributes).to.deep.equals({
					serialization_version   : CUT.constants.latest_serialization_version,
					u_current_session_id    : 1234,
					u_last_user_id          : "toto@laposte.fr",
					u_last_username         : "toto",
					u_serialization_version : 1
				});
			});

			it('should retrieve a session', function() {
				var store = GenericStore.make_new("memory");

				// pre-fill the store with data
				store.set(CUT.constants.keys.u_serialization_version, CUT.constants.latest_serialization_version);
				store.set(CUT.constants.keys.u_current_session_id,    1234);
				store.set(CUT.constants.keys.u_last_username,         "toto");
				store.set(CUT.constants.keys.u_last_user_id,          "toto@laposte.fr");

				var out = CUT.get_instance(store);
				var session = out.get_session();
				expect( session.id ).to.equals(1234);
				expect( session.attributes ).to.have.property('user_id', "toto@laposte.fr");
				expect( session.attributes.current_identity_id ).to.be.undefined;
				expect( session.current_identity.attributes).to.deep.equals({
					serialization_version: Identity.constants.latest_serialization_version,
					username: "toto"
				});
			});

			it('should handle different serialization version');
		}); // describe feature

		describe('utilities', function() {

			it('should allow full reset');
			it('should allow prefix usage');

		}); // describe feature

	}); // describe CUT
}); // requirejs module
