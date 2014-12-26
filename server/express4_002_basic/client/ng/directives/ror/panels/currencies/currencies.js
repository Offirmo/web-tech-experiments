define(
[
	'angular',
	'lodash',
	'text!ng/directives/ror/panels/currencies/currencies.html',
	'css!ng/directives/ror/panels/currencies/currencies.css'
],
function(angular, _, tpl) {
	'use strict';

	global_ng_module
	.directive('rorPanelsCurrencies', function rorPanelsCurrencies () {
		return {
			restrict: 'E',
			scope: {
				client: '='
			},
			template: tpl,
			replace: true,
			controller: 'RorPanelsCurrenciesController',
			link: function ($scope, $element, $attrs) {
				// shortcut
				$scope.state = $scope.client.state;
				console.log($scope.state);
			}
		};
	})
	.controller('RorPanelsCurrenciesController', [
		'$scope',
		RorPanelsCurrenciesController
	]);

	function RorPanelsCurrenciesController($scope) {
		// shortcut
		var client = $scope.client;

		// ...
	}

});
