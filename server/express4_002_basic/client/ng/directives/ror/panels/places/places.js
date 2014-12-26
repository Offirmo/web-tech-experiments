define(
[
	'angular',
	'lodash',
	'text!ng/directives/ror/panels/places/places.html',
	'css!ng/directives/ror/panels/places/places.css'
],
function(angular, _, tpl) {
	'use strict';

	global_ng_module
	.directive('rorPanelsPlaces', function rorPanelsPlaces () {
		return {
			restrict: 'E',
			scope: {
				client: '='
			},
			template: tpl,
			replace: true,
			controller: 'RorPanelsPlacesController',
			link: function ($scope, $element, $attrs) {
				//
			}
		};
	})
	.controller('RorPanelsPlacesController', [
		'$scope',
		RorPanelsPlacesController
	]);

	function RorPanelsPlacesController($scope) {
		// shortcut
		var client = $scope.client;

		$scope.replicate = function() {
			console.log('replicate !');
		}

	}

});
