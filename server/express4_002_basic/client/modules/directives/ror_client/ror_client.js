define(
[
	'angular',
	'lodash',
	'javascript-state-machine',
	'webworker_helper',
	'text!modules/directives/ror_client/ror_client.html'
],
function(angular, _, StateMachine, WebworkerHelper, tpl) {
	'use strict';

	console.log('Hello from dir !');

	angular
	.module('App', [])
	.controller('RoRClientCtrl', [
		'$scope',
		'$log',
		'$http',
		'$q',
		RoRClientCtrl
	])
	.directive('rorClient', [
		'$parse',
		function RoRClient () {
			return {
				restrict: 'E',
				template: tpl,
				replace: true,
				controller: 'RoRClientCtrl',
				link: function ($scope, $element, $attrs) {
					console.log('Hello from dir link !');
				}
			};
		}
	]);

	function RoRClientCtrl() {
		console.log('Hello from dir ctrl !');
	}

});
