define(
[
	'angular',
	'lodash',
	'text!ng/directives/ror/panels/places/places.html',
	'css!ng/directives/ror/panels/places/places.css',
	'ng/directives/ror/panels/places/place/place',
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
				// shortcut
				$scope.state = $scope.client.state;
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

		$scope.current_place = null;
		$scope.$watch('state.story.current_place_id', function(current, previous) {
			if(! current) return;
			console.log('place watch', current, previous);
			$scope.move_to_place(current);
		});

		$scope.move_to_place = function(place_id) {
			$scope.current_place = _.find($scope.state.story.places, {id: place_id});
			console.log('moved to place', $scope.current_place);
		};
	}

});
