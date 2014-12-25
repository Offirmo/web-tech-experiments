define(
[
	'angular',
	'lodash',
	'text!ng/directives/ror/panels/resources/resources.html',
	'css!ng/directives/ror/panels/resources/resources.css'
],
function(angular, _, tpl) {
	'use strict';

	global_ng_module
	.directive('rorPanelsResources', function rorPanelsResources () {
		return {
			restrict: 'E',
			scope: {
				client: '='
			},
			template: tpl,
			replace: true,
			controller: 'RorPanelsResourcesController',
			link: function ($scope, $element, $attrs) {
				$scope.census = $scope.client.state.census;
			}
		};
	})
	.controller('RorPanelsResourcesController', [
		'$scope',
		RorPanelsResourcesController
	]);

	function RorPanelsResourcesController($scope) {
		// shortcut
		var client = $scope.client;

		$scope.replicate = function() {
			console.log('replicate !');
		}

	}

});
