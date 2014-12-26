define(
[
	'angular',
	'lodash',
	'text!ng/directives/ror/client.html',
	'css!ng/directives/ror/client.css',
	'ng/directives/ror/panels/currencies/currencies',
	'ng/directives/ror/panels/census/census',
	'ng/directives/ror/panels/places/places',
	'ng/directives/ror/panels/story_log/story_log',
],
function(angular, _, tpl) {
	'use strict';

	global_ng_module
	.directive('rorClient', function rorClient () {
		return {
			restrict: 'E',
			scope: {
				client: '='
			},
			template: tpl,
			replace: true,
			link: function ($scope, $element, $attrs) {
				// ...
			},
			controller: 'RorClientController'
		};
	})
	.controller('RorClientController', [
		'$scope',
		RorClientController
	]);

	function RorClientController($scope) {
		//console.log('Hello from directive ror.client ctrl !');

		// shortcuts
		var client = $scope.client;

		/// plug to client
		client.on('*', function() {
			console.log('seen client event :', this.event, arguments);
			$scope.$digest();
		});

	}

});
