if (typeof define !== 'function') { var define = require('amdefine')(module) }

define(
[
	'chai',
	'underscore',
	'offirmo/restlink/router',
	'mocha'
],
function(chai, _, CUT) {
	"use strict";

	var expect = chai.expect;
	chai.should();

	describe('route-based container', function() {

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

				out.createRouteAndAttachInfos( "/",                   1);
				out.createRouteAndAttachInfos( "/agent",              20);
				out.createRouteAndAttachInfos( "/agents",             25);
				out.createRouteAndAttachInfos( "/order/:id",          30);
				out.createRouteAndAttachInfos( "/firm/:id",           40);
				out.createRouteAndAttachInfos( "/firm/:id/order/:id", 50);
			});

			it('should reject bad insertions', function() {
				var out = CUT.make_new();

				// empty route, bad !
				EXPECT_THROW( r.createRouteAndAttachInfos("", -1), UrlMatcher::MalformedRouteException);

				// double slash, bad
				EXPECT_THROW( r.createRouteAndAttachInfos("//", -2), UrlMatcher::MalformedRouteException);

				// consecutive id in sequence, bad
				EXPECT_THROW( r.createRouteAndAttachInfos("/foo/<id>/<id>", -2), UrlMatcher::MalformedRouteException);
			});


			TEST(ct_ccf_utils_UrlMatcher, ignoreTrailingSlash)
			{
				SimpleUrlMatcher<int> r;

				// trivial case
				r.createRouteAndAttachInfos("/agent", 20);
				EXPECT_EQ( 20, r.getMatchingRouteInfos("/agent") );
				// this is equivalent, so we must get the same number
				EXPECT_EQ( 20, r.getMatchingRouteInfos("/agent/") );

				// concurrent case : this is the same !
				EXPECT_THROW( r.createRouteAndAttachInfos("/agent/", 21), std::invalid_argument );
			}


			TEST(ct_ccf_utils_UrlMatcher, unknownRouteQuery)
			{
				SimpleUrlMatcher<int> r;

				// unknown resource

				EXPECT_THROW( r.getMatchingRouteInfos("/notexist"), SimpleUrlMatcher<int>::SimpleNoMatchingRouteException );

				IUrlMatchPtr request;
				EXPECT_NO_THROW( request = r.getRouteDetailledInfos("/notexist") );
				EXPECT_FALSE( request->hasMatched() );
			}


			TEST(ct_ccf_utils_UrlMatcher, idRouteQuerySimple)
			{
				SimpleUrlMatcher<int> r;

				// init
				r.createRouteAndAttachInfos("/order/<id>", 30);

				// simple
				EXPECT_EQ( 30, r.getMatchingRouteInfos("/order/1"));
				// the number we attached to this route

				// anything should work
				EXPECT_EQ( 30, r.getMatchingRouteInfos("/order/123soleil") );

				// limit : huge value should be detected and should not crash
				// we must be > ULONG_MAX
				//std::cout << "Note : ULONG_MAX = " << ULONG_MAX << std::endl;
				EXPECT_NO_THROW( r.getMatchingRouteInfos("/order/98765432109876543210") );
			}


			TEST(ct_ccf_utils_UrlMatcher, processingLimits)
			{
				SimpleUrlMatcher<int> r;

				// segment too big
				EXPECT_THROW( r.getMatchingRouteInfos("/abcdefghijklmnopqrstuvwxyzabcdef"), UrlMatcher::MalformedRouteException);

				// URL too big (custom exception for this one)
				EXPECT_THROW( r.getMatchingRouteInfos(""
				"/abcdefghi/abcdefghi/abcdefghi/abcdefghi/abcdefghi"
				"/abcdefghi/abcdefghi/abcdefghi/abcdefghi/abcdefghi"
				"/abcdefghi/abcdefghi/abcdefghi/abcdefghi/abcdefghi"
				"/abcdefghi/abcdefghi/abcdefghi/abcdefghi/abcdefghi"
				"/"), // the extra byte that overflows...
				UrlMatcher::RouteTooLongException);
			}


			TEST(ct_ccf_utils_UrlMatcher, idRouteQueryAdvanced)
			{
				SimpleUrlMatcher<int> r;

				// init
				r.createRouteAndAttachInfos("/order/<id>", 30);

				// complete
				IUrlMatchPtr request = r.getRouteDetailledInfos("/order/378");

				EXPECT_TRUE(request);
				EXPECT_TRUE(request->getRouteData<CustomRouteData<int> >());

				EXPECT_EQ( 30, r.getRouteDataFor(request) );

				EXPECT_EQ( "378", request->getLastId());
				EXPECT_EQ( "378", request->getIdForSegment("order") );

				EXPECT_EQ( 2U,              request->getSegmentCount() );
				EXPECT_EQ( IUrlNode::FIXED, request->getNthSegmentType(0) );
				EXPECT_EQ( "order",         request->getNthSegmentName(0) );
				EXPECT_EQ( IUrlNode::ID,    request->getNthSegmentType(1) );
				EXPECT_EQ( "order",         request->getNthSegmentName(1) );
				// out of bounds :
				EXPECT_EQ( IUrlNode::UNKNOWN, request->getNthSegmentType(2) );
				EXPECT_EQ( "",                request->getNthSegmentName(2) );
				EXPECT_EQ( IUrlNode::UNKNOWN, request->getNthSegmentType(5) );
				EXPECT_EQ( "",                request->getNthSegmentName(5) );
			}


			TEST(ct_ccf_utils_UrlMatcher, alphaIdRouteQuery)
			{
				SimpleUrlMatcher<int> r;

				// init
				r.createRouteAndAttachInfos("/firm/<id>", 40);

				// simple
				EXPECT_EQ( 40, r.getMatchingRouteInfos("/firm/ACME") );
				// the number we attached to this route

				// complex
				IUrlMatchPtr request = r.getRouteDetailledInfos("/firm/ACME");

				EXPECT_TRUE(request);
				EXPECT_TRUE(request->getRouteData<CustomRouteData<int> >());

				EXPECT_EQ( 40, r.getRouteDataFor(request) );

				EXPECT_EQ( "ACME", request->getLastId() );
				EXPECT_EQ( "ACME", request->getIdForSegment("firm") );

				EXPECT_EQ( 2U,              request->getSegmentCount() );
				EXPECT_EQ( IUrlNode::FIXED, request->getNthSegmentType(0) );
				EXPECT_EQ( "firm",          request->getNthSegmentName(0) );
				EXPECT_EQ( IUrlNode::ID,    request->getNthSegmentType(1) );
				EXPECT_EQ( "firm",          request->getNthSegmentName(1) );
				// out of bounds :
				EXPECT_EQ( IUrlNode::UNKNOWN, request->getNthSegmentType(2) );
				EXPECT_EQ( "",                request->getNthSegmentName(2) );
				EXPECT_EQ( IUrlNode::UNKNOWN, request->getNthSegmentType(5) );
				EXPECT_EQ( "",                request->getNthSegmentName(5) );
			}


			TEST(ct_ccf_utils_UrlMatcher, complexQuery)
			{
				SimpleUrlMatcher<int> r;

				// init
				r.createRouteAndAttachInfos("/firm/<id>/order/<id>", 50);

				// simple
				EXPECT_EQ( r.getMatchingRouteInfos("/firm/ACME/order/513"), 50);
				// the number we attached to this route

				// complex
				IUrlMatchPtr request = r.getRouteDetailledInfos("/firm/ACME/order/426");

				EXPECT_TRUE(request);
				EXPECT_TRUE(request->getRouteData<CustomRouteData<int> >());

				EXPECT_EQ( r.getRouteDataFor(request), 50);

				EXPECT_EQ( "order", request->getLastFixedSegment() );
				EXPECT_EQ( "ACME",  request->getIdForSegment("firm") );
				EXPECT_EQ( "426",   request->getLastId() );
				EXPECT_EQ( "426",   request->getIdForSegment("order") );

				EXPECT_EQ( 4U,       request->getSegmentCount() );

				EXPECT_EQ( IUrlNode::FIXED,        request->getNthSegmentType(0) );
				EXPECT_EQ( "firm",                     request->getNthSegmentName(0) );
				EXPECT_EQ( IUrlNode::ID, request->getNthSegmentType(1) );
				EXPECT_EQ( "firm",                     request->getNthSegmentName(1) );
				EXPECT_EQ( IUrlNode::FIXED,        request->getNthSegmentType(2) );
				EXPECT_EQ( "order",                    request->getNthSegmentName(2) );
				EXPECT_EQ( IUrlNode::ID, request->getNthSegmentType(3) );
				EXPECT_EQ( "order",                    request->getNthSegmentName(3) );
				// out of bounds :
				EXPECT_EQ( IUrlNode::UNKNOWN, request->getNthSegmentType(4) );
				EXPECT_EQ( "",               request->getNthSegmentName(4) );
				EXPECT_EQ( IUrlNode::UNKNOWN, request->getNthSegmentType(5) );
				EXPECT_EQ( "",               request->getNthSegmentName(5) );
			}


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

		}); // describe feature

	}); // describe CUT
}); // requirejs module
