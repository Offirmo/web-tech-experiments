define(
[
	'angular',
	'lodash',
	'text!ng/directives/ror/panels/environment/environment.html',
	'css!ng/directives/ror/panels/environment/environment.css'
],
function(angular, _, tpl) {
	'use strict';

	global_ng_module
	.directive('rorPanelsEnvironment', function rorPanelsEnvironment () {
		return {
			restrict: 'E',
			scope: {
				client: '='
			},
			template: tpl,
			replace: true,
			controller: 'RorPanelsEnvironmentController',
			link: function ($scope, $element, $attrs) {
				//
			}
		};
	})
	.controller('RorPanelsEnvironmentController', [
		'$scope',
		RorPanelsEnvironmentController
	]);

	function RorPanelsEnvironmentController($scope) {
		// shortcut
		var client = $scope.client;

		$scope.replicate = function() {
			console.log('replicate !');
		}

	}

});
