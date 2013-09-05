if (typeof define !== 'function') { var define = require('amdefine')(module) }

define(
[
	'chai',
	'underscore',
	'offirmo/restlink/url_and_action_indexed_shared_container',
	'offirmo/utils/extended_exceptions',
	'mocha'
],
function(chai, _, CUT, EE) {
	"use strict";

	var expect = chai.expect;
	chai.should();

	describe('url+action indexed container', function() {

		describe('instantiation', function() {

			it('should be possible', function() {
				var out = CUT.make_new();
				out.should.exist;
				out.should.be.an('object');
			});

			it('should set default values', function() {
				var out = CUT.make_new();
				//...
			});

		}); // describe feature

		describe('storage', function() {

			it('should allow good insertions', function() {
				var out = CUT.make_new();

				out.ensure( "/",                   "GET");
				out.ensure( "/agent",              "PUT");
				out.ensure( "/agents",             "GET");
				out.ensure( "/order/:id",          "PUT");
				out.ensure( "/firm/:id",           "GET");
				out.ensure( "/firm/:id/order/:id", "PUT");
			});

			it('should handle simple access with or without ids', function() {
				var out = CUT.make_new();

				// preparation
				out.ensure("/order/:id", "GET");
				out.at("/order/:id", "GET").test = 1;

				// simple
				out.at("/order/1").test.should.equal(1);
			});
		}); // describe feature

		describe('matching', function() {

			it('should work with several numeric+alpha ids', function() {
				var out = CUT.make_new();

				// preparation
				out.ensure("/firm/:id/order/:id/part/:id", "GET");

				//
				var match_infos = out.detailed_at("/firm/ACME/order/513/part/2b");
				match_infos.should.exist;

				match_infos.found.should.be.true;
				match_infos.payload.should.equals(50);
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
