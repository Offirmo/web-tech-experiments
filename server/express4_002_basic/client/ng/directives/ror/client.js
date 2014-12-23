define(
[
	'angular',
	'lodash',
	'text!ng/directives/ror/client.html',
	'ng/directives/ror/panels/census',
	'css!ng/directives/ror/client.css',
],
function(angular, _, tpl) {
	'use strict';

	//console.log('Hello from directive ror.client !');

	global_ng_module
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
			scope: {
				client: '='
			},
			template: tpl,
			replace: true,
			link: function ($scope, $element, $attrs) {
				//console.log('Hello from directive ror.client link !');
			},
			controller: 'RorClientCtrl'
		};
	});

	function RorClientCtrl() {
		//console.log('Hello from directive ror.client ctrl !');
	}

});
