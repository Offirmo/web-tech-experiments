"use strict";
if (typeof define !== 'function') { var define = require('amdefine')(module) }

define(
[
	'chai',
	'offirmo/utils/recent_and_favorites'
],
function(chai, CUT) {

	var expect = chai.expect;
	chai.should();

	describe('RecentAndFavs', function() {

		describe('instantiation', function() {

			it('should be instantiable', function() {
				var out = new CUT();
				out.should.exist;
				out.should.be.an('object');
			});

			it('should set default values', function() {
				var out = new CUT();
				out.get('recents').should.be.empty;
				out.get('max_recents_size').should.be.within(3,100);
				out.get('favorites').should.be.empty;
				out.get('max_favorites_size').should.be.within(3,100);
			});

		});

		describe('recents', function() {

			it('should be addable', function() {
				var out = new CUT();

				out.add_recent('1');
				out.get('recents').should.have.length(1);
				out.get('recents').should.include.members(['1']);

				out.add_recent('2');
				out.get('recents').should.have.length(2);
				out.get('recents').should.include.members(['1', '2']);
			});

			it('should not duplicate', function() {
				var out = new CUT();

				out.get('recents').should.be.empty;
				out.get('favorites').should.be.empty;

				out.add_recent('1');
				out.add_recent('1');
				out.add_recent('2');
				out.add_recent('1');
				out.add_recent('2');

				out.get('recents').should.have.length(2);
				out.get('recents').should.include.members(['1', '2']);
			});

			it('should be ordered by recentness', function() {
				var out = new CUT();

				out.add_recent('1');
				out.get('recents')[0].should.equal('1');

				out.add_recent('2');
				out.get('recents')[0].should.equal('2');

				out.add_recent('1');
				out.get('recents')[0].should.equal('1');
			});

			it('should be first-in first-out if full', function() {
				var out = new CUT();

				var max_recents = out.get('max_recents_size');

				for(var i = 0; i < max_recents; i++) {
					out.add_recent(i.toString());
				}
				out.get('recents').should.have.length(max_recents); // max
				out.get('recents')[0].should.equal((max_recents - 1).toString());

				// add one more
				out.add_recent(max_recents.toString()); // should still have max length (not more)
				out.get('recents').should.have.length(max_recents); // max
				out.get('recents')[0].should.equal(max_recents.toString());
			});

		});

		describe('favorites', function() {

			it('should be toggleable in', function() {
				var out = new CUT;

				out.toggle_favorite('1');
				out.get('favorites').should.have.length(1);
				out.get('favorites').should.include.members(['1']);

				out.toggle_favorite('2');
				out.get('favorites').should.have.length(2);
				out.get('favorites').should.include.members(['1', '2']);
			});

			it('should be toggleable out', function() {
				var out = new CUT;

				out.toggle_favorite('1');
				out.toggle_favorite('2');
				out.get('favorites').should.have.length(2);
				out.get('favorites').should.include.members(['1', '2']);

				out.toggle_favorite('1');
				out.get('favorites').should.have.length(1);
				out.get('favorites').should.include.members(['2']); // 1 has been removed
			});

		});

		it('should be validated');

		describe('sync', function() {

			it('should be unpersistable');

			it('should be persistable');
		});

	});
});
