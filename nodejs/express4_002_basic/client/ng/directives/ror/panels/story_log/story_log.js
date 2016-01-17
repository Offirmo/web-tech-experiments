define(
[
	'angular',
	'lodash',
	'text!ng/directives/ror/panels/story_log/story_log.html',
	'css!ng/directives/ror/panels/story_log/story_log.css'
],
function(angular, _, tpl) {
	'use strict';

	global_ng_module
	.directive('rorPanelsStoryLog', function rorPanelsStoryLog () {
		return {
			restrict: 'E',
			scope: {
				client: '='
			},
			template: tpl,
			replace: true,
			controller: 'RorPanelsStoryLogController',
			link: function ($scope, $element, $attrs) {
				// shortcut
				$scope.state = $scope.client.state;
			}
		};
	})
	.controller('RorPanelsStoryLogController', [
		'$scope',
		RorPanelsStoryLogController
	]);

	function RorPanelsStoryLogController($scope) {
		// shortcut
		var client = $scope.client;

		$scope.clear_log = function() {
			client.clear_log();
		};

	}

});
