define(
[
	'angular',
	'lodash',
	'text!ng/directives/ror/panels/census.html',
	'css!ng/directives/ror/panels/census.css'
],
function(angular, _, tpl) {
	'use strict';

	//console.log('Hello from directive ror.panels.census !');

	global_ng_module
	.directive('rorPanelsCensus', function RorPanelsCensus () {
		return {
			restrict: 'E',
			scope: {
				client: '='
			},
			template: tpl,
			replace: true,
			controller: 'RorPanelsCensusCtrl',
			link: function ($scope, $element, $attrs) {
				//console.log('Hello from directive ror.panels.census link !');
				$scope.census = $scope.client.state.census;
			}
		};
	})
	.controller('RorPanelsCensusCtrl', [
		'$scope',
		'$log',
		'$http',
		'$q',
		RorPanelsCensusCtrl
	]);

	function RorPanelsCensusCtrl($scope) {
		//console.log('Hello from directive ror.panels.census ctrl !');
		$scope.replicate = function() {
			console.log('replicate !');
		}

	}

});
