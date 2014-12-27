define(
[
	'angular',
	'lodash',
	'text!ng/directives/ror/panels/places/place/place.html',
	'css!ng/directives/ror/panels/places/place/place.css'
],
function(angular, _, tpl) {
	'use strict';

	global_ng_module
	.directive('rorPanelsPlace', function rorPanelsPlace () {
		return {
			restrict: 'E',
			scope: {
				client: '=',
				place: '='
			},
			template: tpl,
			replace: true,
			controller: 'RorPanelsPlaceController',
			link: function ($scope, $element, $attrs) {
				// shortcut
				$scope.state = $scope.client.state;
			}
		};
	})
	.controller('RorPanelsPlaceController', [
		'$scope',
		RorPanelsPlaceController
	]);

	function RorPanelsPlaceController($scope) {
		// shortcut
		var client = $scope.client;

	}

});
