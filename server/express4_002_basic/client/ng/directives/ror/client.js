define(
[
	'angular',
	'lodash',
	'text!ng/directives/ror/client.html',
	'ng/directives/ror/panels/census'
],
function(angular, _, tpl) {
	'use strict';

	console.log('Hello from directive ror.client !');

	angular.module('ror.client', [
		'ror.panels.census'
	])
	.controller('RorClientCtrl', [
		'$scope',
		'$log',
		'$http',
		'$q',
		RorClientCtrl
	])
	.directive('rorClient', function rorClient () {
		return {
			restrict: 'E',
			template: tpl,
			replace: true,
			controller: 'RorClientCtrl',
			link: function ($scope, $element, $attrs) {
				console.log('Hello from directive ror.client link !');
			}
		};
	});

	function RorClientCtrl() {
		console.log('Hello from directive ror.client ctrl !');
	}

});
