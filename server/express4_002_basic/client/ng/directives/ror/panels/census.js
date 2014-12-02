define(
[
	'angular',
	'lodash',
	'text!ng/directives/ror/panels/census.html'
],
function(angular, _, tpl) {
	'use strict';

	//console.log('Hello from directive ror.panels.census !');

	global_ng_module
	.controller('RorPanelsCensusCtrl', [
		'$scope',
		'$log',
		'$http',
		'$q',
		RorPanelsCensusCtrl
	])
	.directive('rorPanelsCensus', function RorPanelsCensus () {
		return {
			restrict: 'E',
			template: tpl,
			replace: true,
			controller: 'RorPanelsCensusCtrl',
			link: function ($scope, $element, $attrs) {
				//console.log('Hello from directive ror.panels.census link !');
			}
		};
	});

	function RorPanelsCensusCtrl() {
		//console.log('Hello from directive ror.panels.census ctrl !');
	}

});
