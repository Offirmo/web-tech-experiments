if (typeof define !== 'function') { var define = require('amdefine')(module); }

define(
[
	'chai',
	'underscore',
	'offirmo/restlink/server_internals/rest_target_indexed_shared_container',
	'offirmo/utils/extended_exceptions',
	'mocha'
],
function(chai, _, CUT, EE) {
	"use strict";

	var expect = chai.expect;
	chai.should();
	chai.Assertion.includeStack = true; // defaults to false

	describe('REST target (url+action) indexed container', function() {

		describe('instantiation', function() {

			it('should work', function() {
				var out = CUT.make_new();
				out.should.exist;
				out.should.be.an('object');
			});

			it('should set default values', function() {
				var out = CUT.make_new();
				//...
			});

		}); // describe feature

		// note : advanced features are tested below, in "internal API"
		describe('regular API', function() {

			describe('storage', function() {

				it('should allow operations', function() {
					var out_ = CUT.make_new();
					var out = out_.get_bound_interface("test key");

					out.ensure( "/agent/:id", "GET").test = 1;
					out.ensure( "/agent",     "PUT").test = 3;

					out.at( "/agent/:id", "GET").test.should.equals(1);
					out.at( "/agent/1",   "GET").test.should.equals(1);
					out.at( "/agent",     "PUT").test.should.equals(3);

					out.detailed_at( "/agent/1",   "GET").found.should.be.true;
				});

				it('should not mix infos', function() {
					var out_ = CUT.make_new();

					var out1 = out_.get_bound_interface("test key 1");
					var out2 = out_.get_bound_interface("test key 2");

					out1.ensure( "/agent/:id", "GET").test = 1;
					out1.ensure( "/agent",     "PUT").test = 3;

					out2.ensure( "/agent/:id", "GET").test = -1;
					out2.ensure( "/agent",     "PUT").test = -3;

					out1.at( "/agent/:id", "GET").test.should.equals(1);
					out1.at( "/agent",     "PUT").test.should.equals(3)

					out2.at( "/agent/:id", "GET").test.should.equals(-1);
					out2.at( "/agent",     "PUT").test.should.equals(-3);
				});

				it('should not mix infos (bug investigation 2013/08)', function() {
					var out_ = CUT.make_new();

					var out = out_.get_bound_interface("test key 1");

					out.ensure("/stanford/teapot", "BREW").callback = 1;
					out.ensure("/firm/:id",        "GET" ).callback = 2;

					out.at( "/stanford/teapot", "BREW").callback.should.equals(1);
					out.at( "/firm/:id",        "GET" ).callback.should.equals(2);
				});

			}); // describe feature

			describe('matching', function() {

				it('should correctly handle inexistent data', function() {
					var out = CUT.make_new();

					var match_infos = out.shared_detailed_at("/firm/ACME/order/513/part/2b", "PUT");

					match_infos.should.exist;
					match_infos.found.should.be.false;
					match_infos.route_found.should.be.false;
					match_infos.action_found.should.be.false;

					out.internal_ensure("/firm/:id/order/:id/part/:id", "PUT", "test key").toto = 1

					var match_infos = out.shared_detailed_at("/firm/ACME/order/513/part/2b", "GET");
					match_infos.should.exist;
					match_infos.found.should.be.false;
					match_infos.route_found.should.be.true;
					match_infos.action_found.should.be.false;
				});

				it('should work with several numeric+alpha ids', function() {
					var out = CUT.make_new();

					// preparation
					out.internal_ensure("/firm/:id/order/:id/part/:id", "PUT", "test key").toto = 1
					//
					var match_infos = out.shared_detailed_at("/firm/ACME/order/513/part/2b", "PUT");
					match_infos.should.exist;

					match_infos.found.should.be.true;
					match_infos.route_found.should.be.true;
					match_infos.action_found.should.be.true;

					match_infos.payload.get_data("test key").toto.should.equals(1);
					match_infos.last_id.should.equals('2b');
					match_infos.ids['firm'].should.equals('ACME');
					match_infos.ids['order'].should.equals('513');
					match_infos.ids['part'].should.equals('2b');

					match_infos.segments.length.should.equals(7);

					match_infos.segments[0].should.have.property('segment', '/');
					match_infos.segments[0].should.have.property('type',    'fixed');
					match_infos.segments[0].should.have.property('value',   '/');

					match_infos.segments[1].should.have.property('segment', 'firm');
					match_infos.segments[1].should.have.property('type',    'fixed');
					match_infos.segments[1].should.have.property('value',   'firm');

					match_infos.segments[2].should.have.property('segment', 'firm');
					match_infos.segments[2].should.have.property('type',    'id');
					match_infos.segments[2].should.have.property('value',   'ACME');

					match_infos.segments[3].should.have.property('segment', 'order');
					match_infos.segments[3].should.have.property('type',    'fixed');
					match_infos.segments[3].should.have.property('value',   'order');

					match_infos.segments[4].should.have.property('segment', 'order');
					match_infos.segments[4].should.have.property('type',    'id');
					match_infos.segments[4].should.have.property('value',   '513');

					match_infos.segments[5].should.have.property('segment', 'part');
					match_infos.segments[5].should.have.property('type',    'fixed');
					match_infos.segments[5].should.have.property('value',   'part');

					match_infos.segments[6].should.have.property('segment', 'part');
					match_infos.segments[6].should.have.property('type',    'id');
					match_infos.segments[6].should.have.property('value',   '2b');
				});

			}); // describe feature

		}); // describe feature (regular API)


		describe('internal API', function() {
			describe('storage', function() {

				it('should allow good insertions', function() {
					var out = CUT.make_new();

					out.internal_ensure( "/",                   "GET", "test key");
					out.internal_ensure( "/agent",              "GET", "test key");
					out.internal_ensure( "/agent",              "PUT", "test key");
					out.internal_ensure( "/agents",             "GET", "test key");
					out.internal_ensure( "/order/:id",          "PUT", "test key");
					out.internal_ensure( "/firm/:id",           "GET", "test key");
					out.internal_ensure( "/firm/:id/order/:id", "PUT", "test key");
				});

				it('should handle simple access with or without ids', function() {
					var out = CUT.make_new();

					// preparation
					out.internal_ensure("/order/:id", "GET", "test key").test = 1;

					// simple
					out.internal_at("/order/1", "GET", "test key").test.should.equal(1);
				});

				// important since we tend to forget the action
				it('should check parameters', function() {
					var out = CUT.make_new();

					var tempfn = function() { out.internal_ensure("/agent"); }
					tempfn.should.throw(EE.InvalidArgument, "action arg should be a string !");

					tempfn = function() { out.internal_ensure("/agent", 3); }
					tempfn.should.throw(EE.InvalidArgument, "action arg should be a string !");

					tempfn = function() { out.internal_ensure("/agent", "DELETE"); }
					tempfn.should.throw(EE.InvalidArgument, "key arg should be a string !");

					tempfn = function() { out.internal_ensure(undefined, "GET"); }
					tempfn.should.throw(EE.InvalidArgument, "route arg should be a string !");


					var tempfn = function() { out.internal_at("/agent"); }
					tempfn.should.throw(EE.InvalidArgument, "action arg should be a string !");

					var tempfn = function() { out.internal_detailed_at("/agent"); }
					tempfn.should.throw(EE.InvalidArgument, "action arg should be a string !");
				});

				it('should not mix infos', function() {
					var out = CUT.make_new();

					// preparation
					out.internal_ensure("/order/:id", "GET", "test key 1").test = 1;
					out.internal_ensure("/order/:id", "PUT", "test key 1").test = 2;
					out.internal_ensure("/order/:id", "GET", "test key 2").test = 3;
					out.internal_ensure("/stanford/teapot", "BREW", "test key 1").test = 4;
					out.internal_ensure("/stanford/teapot", "GET",  "test key 1").test = 5;

					// check
					out.internal_at("/order/:id", "GET", "test key 1").test.should.equals(1);
					out.internal_at("/order/:id", "PUT", "test key 1").test.should.equals(2);
					out.internal_at("/order/:id", "GET", "test key 2").test.should.equals(3);
					out.internal_at("/stanford/teapot", "BREW", "test key 1").test.should.equals(4);
					out.internal_at("/stanford/teapot", "GET", "test key 1").test.should.equals(5);
				});
			}); // describe feature

			describe('matching', function() {

				// we don't duplicate regular test which is equivalent

				it('should work with or without a key', function() {
					var out = CUT.make_new();

					// preparation
					out.internal_ensure("/firm/:id/order/:id/part/:id", "PUT", "test key").toto = 1
					//
					var match_infos = out.internal_detailed_at("/firm/ACME/order/513/part/2b", "PUT");
					match_infos.payload.get_data("test key").toto.should.equals(1);

					match_infos = out.internal_detailed_at("/firm/ACME/order/513/part/2b", "PUT", "test key");
					match_infos.payload.toto.should.equals(1);
				});

			}); // describe feature
		}); // describe feature (internal API)

		/*
		 TEST(ct_ccf_utils_UrlMatcher, iterator)
		 {
		 // simple case 1
		 {
		 SimpleUrlMatcher<int> r;

		 // nothing in the tree

		 SimpleUrlMatcher<int>::const_iterator it = r.getIterator();

		 EXPECT_FALSE( it.endReached() ); // since there is always at last the root node

		 EXPECT_EQ( "/", it->getCanonicalRoute() );

		 it.iterateForward();
		 EXPECT_TRUE( it.endReached() ); // there was only one node
		 }

		 // slightly more complicated
		 {
		 SimpleUrlMatcher<int> r;

		 r.createRouteAndAttachInfos("/toto", 50);

		 SimpleUrlMatcher<int>::const_iterator it = r.getIterator();

		 EXPECT_FALSE( it.endReached() );
		 EXPECT_EQ( "/", it->getCanonicalRoute() );

		 it.iterateForward();
		 EXPECT_FALSE( it.endReached() );
		 EXPECT_EQ( "/toto", it->getCanonicalRoute() );

		 it.iterateForward();;
		 EXPECT_TRUE( it.endReached() );
		 }

		 // slightly more complicated
		 {
		 SimpleUrlMatcher<int> r;

		 r.createRouteAndAttachInfos("/order/<id>", 50);

		 SimpleUrlMatcher<int>::const_iterator it = r.getIterator();

		 EXPECT_FALSE( it.endReached() );
		 EXPECT_EQ( "/", it->getCanonicalRoute() );

		 it.iterateForward();
		 EXPECT_FALSE( it.endReached() );
		 EXPECT_EQ( "/order", it->getCanonicalRoute() );

		 it.iterateForward();
		 EXPECT_FALSE( it.endReached() );
		 EXPECT_EQ( "/order/<id>", it->getCanonicalRoute() );

		 it.iterateForward();
		 EXPECT_TRUE( it.endReached() );
		 }

		 {
		 SimpleUrlMatcher<int> r;

		 // init
		 r.createRouteAndAttachInfos("/firm/<id>/order/<id>", 50);
		 r.createRouteAndAttachInfos("/class/<id>", 50);

		 SimpleUrlMatcher<int>::const_iterator it = r.getIterator();

		 EXPECT_FALSE( it.endReached() );
		 EXPECT_EQ( "/", it->getCanonicalRoute() );

		 it.iterateForward();
		 EXPECT_FALSE( it.endReached() );
		 EXPECT_EQ( "/class", it->getCanonicalRoute() );

		 it.iterateForward();
		 EXPECT_FALSE( it.endReached() );
		 EXPECT_EQ( "/class/<id>", it->getCanonicalRoute() );

		 it.iterateForward();
		 EXPECT_FALSE( it.endReached() );
		 EXPECT_EQ( "/firm", it->getCanonicalRoute() );

		 it.iterateForward();
		 EXPECT_FALSE( it.endReached() );
		 EXPECT_EQ( "/firm/<id>", it->getCanonicalRoute() );

		 it.iterateForward();
		 EXPECT_FALSE( it.endReached() );
		 EXPECT_EQ( "/firm/<id>/order", it->getCanonicalRoute() );

		 it.iterateForward();
		 EXPECT_FALSE( it.endReached() );
		 EXPECT_EQ( "/firm/<id>/order/<id>", it->getCanonicalRoute() );

		 it.iterateForward();
		 EXPECT_TRUE( it.endReached() );
		 }
		 }


		 TEST(ct_ccf_utils_UrlMatcher, dataIterator)
		 {
		 {
		 SimpleUrlMatcher<int> r;

		 // init
		 r.createRouteAndAttachInfos("/firm/<id>/order/<id>", 10);
		 r.createRouteAndAttachInfos("/class/<id>", 20);

		 UrlMatcherDataConstIterator<CustomRouteData<int> > it( r.getIterator() );

		 EXPECT_FALSE( it.endReached() );
		 EXPECT_EQ( 20, it->details_ );

		 it.iterateForward();
		 EXPECT_FALSE( it.endReached() );
		 EXPECT_EQ( 10, it->details_ );

		 it.iterateForward();
		 EXPECT_TRUE( it.endReached() );
		 }
		 }
		 */

	}); // describe CUT
}); // requirejs module
