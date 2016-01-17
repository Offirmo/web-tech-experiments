define(
[
	'angular',
	'lodash',
	'text!ng/directives/ror/navbar/navbar.html',
	'css!ng/directives/ror/navbar/navbar.css'
],
function(angular, _, tpl) {
	'use strict';

	global_ng_module
	.directive('rorNavbar', function RorNavbar () {
		return {
			restrict: 'E',
			scope: {
				client: '='
			},
			template: tpl,
			replace: true,
			controller: 'RorNavbarController',
			link: function ($scope, $element, $attrs) {
				// shortcut
				$scope.state = $scope.client.state;
			}
		};
	})
	.controller('RorNavbarController', [
		'$scope',
		RorNavbarController
	]);

	function RorNavbarController($scope) {

		// shortcuts
		var client = $scope.client;

		$scope.pause = function() {
			client.post_action('pause');
		};

		$scope.unpause = function() {
			client.post_action('unpause');
		};

		$scope.forward = function() {
			client.post_action('fast_forward');
		};
	}

});
