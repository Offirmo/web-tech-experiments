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

		$scope.actions = [
			'Explore',
			'Gather materials',
			'Gather energy'
		];

		$scope.$watch('place', function(current, previous) {
			if(! current) return;
			console.log('place', current, previous);

			// strip unused properties
			var resources = [];
			_.forEach(client.Data.resources_by_rank, function(resource) {
				if(typeof current[resource.id] === 'undefined') return;

				resources.push({
					id: resource.id,
					designation: resource.designation,
					quantity: current[resource.id]
				});
			});
			$scope.resources = resources;
			console.log('place', current, resources);

		});
	}

});
