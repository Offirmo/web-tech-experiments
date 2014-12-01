define(
[
	'angular',
	'lodash',
	'text!modules/directives/test.html'
],
function(angular, _, tpl) {
	'use strict';

	console.log('Hello from directive test !');

	angular.module('test', [])
	.directive('test', function test () {
		return {
			restrict: 'E',
			template: tpl,
			replace: true
		};
	});

});
