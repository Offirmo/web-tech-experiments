if (typeof define !== 'function') { var define = require('amdefine')(module) }

define(
[
	'chai',
	'underscore',
	'offirmo/restlink/route_indexed_container',
	'offirmo/utils/extended_exceptions',
	'mocha'
],
function(chai, _, CUT, EE) {
	"use strict";

	var expect = chai.expect;
	chai.should();

	describe('route-indexed container', function() {

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

				out.insert( "/",                   1);
				out.insert( "/agent",              20);
				out.insert( "/agents",             25);
				out.insert( "/order/:id",          30);
				out.insert( "/firm/:id",           40);
				out.insert( "/firm/:id/order/:id", 50);
			});

			it('should reject bad insertions', function() {
				var out = CUT.make_new();

				// empty route, bad !
				var tempfn = function() { out.insert( "", -1); }
				tempfn.should.throw(CUT.exceptions.MalformedRouteError, "Route malformed : missing start !");

				// double slash, bad
				var tempfn = function() { out.insert("//", -1); }
				tempfn.should.throw(CUT.exceptions.MalformedRouteError, "Route malformed : empty segment !");

				// consecutive id in sequence, bad
				var tempfn = function() { out.insert("/foo/:id/:id", -1); }
				tempfn.should.throw(CUT.exceptions.MalformedRouteError, "Route malformed : a route can't have several consecutive ids !");

				// id directly after root, bad
				var tempfn = function() { out.insert("/:id", -1); }
				tempfn.should.throw(CUT.exceptions.MalformedRouteError, "Route malformed : root can't be followed by an id !");
			});

			it('should ignore trailing slash', function() {
				var out = CUT.make_new();

				// preparation
				out.insert("/agent", 20);

				// read back
				out.at("/agent").should.equal(20);
				// this is equivalent, so we must get the same number
				out.at("/agent/").should.equal(20);

				// concurrent case : this is the same !
				var tempfn = function() { out.insert("/agent/", 21); }
				tempfn.should.throw(EE.InvalidArgument, "This route already has attached data !");
			});

			it('should handle ids', function() {
				var out = CUT.make_new();

				// preparation
				out.insert("/order/:id", 30);

				// simple
				out.at("/order/1").should.equal(30);
				// the number we attached to this route

				// anything should work
				out.at("/order/123soleil").should.equal(30);

				// limit : huge value should be detected and should not crash
				out.at("/order/98765432109876543210").should.equal(30);
			});

			it('should have limits', function() {
				var out = CUT.make_new();

				var tempfn = function() { out.insert("/abcdefghijklmnopqrstuvwxyzabcdef", 30); }
				tempfn.should.throw(CUT.exceptions.MalformedRouteError, "Route malformed : segment too long !");

				var tempfn = function() { out.at("" +
				"/abcdefghi/abcdefghi/abcdefghi/abcdefghi/abcdefghi" +
				"/abcdefghi/abcdefghi/abcdefghi/abcdefghi/abcdefghi" +
				"/abcdefghi/abcdefghi/abcdefghi/abcdefghi/abcdefghi" +
				"/abcdefghi/abcdefghi/abcdefghi/abcdefghi/abcdefghi" +
				"/").should.equal(30); }
				tempfn.should.throw(CUT.exceptions.MalformedRouteError, "Route malformed : route too long !");
			});
		}); // describe feature

		describe('matching', function() {

			it('should work with a simple numeric id', function() {
				var out = CUT.make_new();

				// preparation
				out.insert("/order/:id", 30);

				//
				var match_infos = out.detailed_at("/order/378");
				match_infos.should.exist;

				match_infos.found.should.be.true;
				match_infos.payload.should.equals(30);
				match_infos.last_id.should.equals('378');
				match_infos.ids['order'].should.equals('378');

				match_infos.segments.length.should.equals(3);

				match_infos.segments[0].should.have.property('segment', '/');
				match_infos.segments[0].should.have.property('type',    'fixed');
				match_infos.segments[0].should.have.property('value',   '/');

				match_infos.segments[1].should.have.property('segment', 'order');
				match_infos.segments[1].should.have.property('type',    'fixed');
				match_infos.segments[1].should.have.property('value',   'order');

				match_infos.segments[2].should.have.property('segment', 'order');
				match_infos.segments[2].should.have.property('type',    'id');
				match_infos.segments[2].should.have.property('value',   '378');
			});

			it('should work with several numeric+alpha ids', function() {
				var out = CUT.make_new();

				// preparation
				out.insert("/firm/:id/order/:id/part/:id", 50);

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
