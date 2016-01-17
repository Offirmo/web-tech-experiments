/**
 * Enricher which stores current node cluster worker id.
 * Defaults to null if not in a cluster
 */

if (typeof exports === 'undefined') {
	// not node : browser or web worker
	// no cluster
	define(function () {
		'use strict';

		function enrich_with_empty_cluster_worker_id(log_call) {
			log_call.cluster_worker_id = null;
		}

		return {
			// objects are created via a factory, more future-proof
			'make_new': function () { return enrich_with_empty_cluster_worker_id; },
			is_worker: false,
		};
	});
}
else {
// if node.js : use amdefine (add it with npm)
	if (typeof define !== 'function') { var define = require('amdefine')(module); }

	define([
		'cluster'
	],
	function (cluster) {
		'use strict';

		// efficiency : the value never change
		var cluster_worker_id = cluster.isWorker ? cluster.worker.id : null;

		function enrich_with_cluster_worker_id(log_call) {
			log_call.cluster_worker_id = cluster_worker_id;
		}

		return {
			// objects are created via a factory, more future-proof
			'make_new': function () {
				return enrich_with_cluster_worker_id;
			},
			is_worker: cluster.isWorker,
		};
	});
}
