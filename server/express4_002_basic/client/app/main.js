window.main = function()
{
	'use strict';

	console.log('Starting page main js...');

	// angular modules simplified ;-)
	var global_module_instance;
	Object.defineProperty(window, 'global_ng_module', {
		enumerable: true, // why not ?
		set: function() {
			throw new Error('You can’t assign window.global_module !');
		},
		get: function() {
			if(global_module_instance) return global_module_instance; // already OK
			console.log('building');
			global_module_instance = angular.module('global_ng_module', [
				'ui.bootstrap'
			]);
			return global_module_instance;
		}
	});


	// thank you http://patorjk.com/software/taag/#p=display&h=3&v=0&f=Rectangles&t=Rise%20%20of%20%20the%20%20replicators
	console.log('\n\n' +
		' _____ _                  ___      _   _                        _ _         _                \n' +
		'| __  |_|___ ___      ___|  _|    | |_| |_ ___      ___ ___ ___| |_|___ ___| |_ ___ ___ ___  \n' +
		"|    -| |_ -| -_|    | . |  _|    |  _|   | -_|    |  _| -_| . | | |  _| .'|  _| . |  _|_ -| \n" +
		'|__|__|_|___|___|    |___|_|      |_| |_|_|___|    |_| |___|  _|_|_|___|__,|_| |___|_| |___| \n' +
		'                                                           |_|                               \n' +
		' So you are curious ?\n\n ');

	requirejs(
		[
			'lodash',
			'logator',
			//'webworker_helper',
			//'ng/directives/test',
			'ror/core/server',
			'ng/directives/ror/client',
			'angular',
			'angular-ui-router',
			'angular-bootstrap'
		],
		function(_, Logator, RorServer) {
			console.log('main require done.');

			// build this app logger
			var logger = Logator.make_new({enhanced: true});
			logger.info('App is bootstrapping…');

			global_ng_module
			.controller('LandingCtrl', function($scope, $document) {
				$scope.lang = $document[0].documentElement.lang;
				logger.info('detected lang :', $document[0].documentElement.lang);
			});

			// angular manual initialisation since we use a script loader
			// cf. http://docs.angularjs.org/guide/bootstrap
			console.log('Bootstrapping angular...');
			angular.element(document).ready(function() {
				angular.bootstrap(document, ['global_ng_module']);
			});

			var server = RorServer.make_new({
				logger: logger
			});
		});


	if(false) {
		/*
		var worker = new Worker('ror_worker.js');

		// immediately start listening to worker
		var worker_ready = false;

		function send_to_worker(m) {
			worker.postMessage(m);
			console.log("Msg sent to worker : " + m);
		}

		worker.onerror = function (e) {
			// Log the error message, including worker filename and line number
			console.log("Error at " + e.filename + ":" + e.lineno + ": " + e.message, e);
		};
		worker.onmessage = function (e) {
			//console.log("Msg received from worker : ", e.data);
			if (!worker_ready) {
				worker_ready = true;
				send_to_worker('Hello from page !');
			}

			if (WebworkerHelper.process_log_message(e)) return;

			console.error("Unknown msg received from worker : ", e.data);
		};*/
	}
};
