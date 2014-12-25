define(
[
	'angular',
	'lodash',
	'text!ng/directives/ror/client.html',
	'css!ng/directives/ror/client.css',
	'ng/directives/ror/panels/census/census',
	'ng/directives/ror/panels/resources/resources',
	'ng/directives/ror/panels/story_log/story_log',
],
function(angular, _, tpl) {
	'use strict';

	global_ng_module
	.directive('rorClient', function rorClient () {
		return {
			restrict: 'E',
			scope: {
				client: '='
			},
			template: tpl,
			replace: true,
			link: function ($scope, $element, $attrs) {
				// ...
			},
			controller: 'RorClientController'
		};
	})
	.controller('RorClientController', [
		'$scope',
		RorClientController
	]);

	function RorClientController() {
		//console.log('Hello from directive ror.client ctrl !');
	}

});
