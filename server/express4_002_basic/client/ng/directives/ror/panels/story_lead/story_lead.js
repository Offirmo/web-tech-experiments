define(
[
	'angular',
	'lodash',
	'text!ng/directives/ror/panels/story_lead/story_lead.html',
	'css!ng/directives/ror/panels/story_lead/story_lead.css'
],
function(angular, _, tpl) {
	'use strict';

	global_ng_module
	.directive('rorPanelsStoryLead', function rorPanelsStoryLead () {
		return {
			restrict: 'E',
			scope: {
				client: '='
			},
			template: tpl,
			replace: true,
			controller: 'RorPanelsStoryLeadController',
			link: function ($scope, $element, $attrs) {
				// shortcut
				$scope.state = $scope.client.state;
			}
		};
	})
	.controller('RorPanelsStoryLeadController', [
		'$scope',
		RorPanelsStoryLeadController
	]);

	function RorPanelsStoryLeadController($scope) {
		// shortcut
		var client = $scope.client;
	}

});
