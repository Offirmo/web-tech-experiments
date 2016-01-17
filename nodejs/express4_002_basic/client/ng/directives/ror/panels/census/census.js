define(
[
	'angular',
	'lodash',
	'text!ng/directives/ror/panels/census/census.html',
	'css!ng/directives/ror/panels/census/census.css'
],
function(angular, _, tpl) {
	'use strict';

	global_ng_module
	.directive('rorPanelsCensus', function RorPanelsCensus () {
		return {
			restrict: 'E',
			scope: {
				client: '='
			},
			template: tpl,
			replace: true,
			controller: 'RorPanelsCensusController',
			link: function ($scope, $element, $attrs) {
				// shortcut
				$scope.state = $scope.client.state;
			}
		};
	})
	.controller('RorPanelsCensusController', [
		'$scope',
		RorPanelsCensusController
	]);

	function RorPanelsCensusController($scope) {
		$scope.qties = [1, 64, 128, 256, 1024];
		$scope.batch_quantity = 1;

		// shortcut
		var client = $scope.client;

		$scope.set_batch_quantity = function set_batch_quantity(qty) {
			$scope.batch_quantity = qty;
		}

		// make new unit
		$scope.replicate = function(qty) {
			console.log('replicate !');
			client.post_action('replicate', {
				count: qty
			});
		}

		// salvage least tech unit for energy
		$scope.salvage = function() {
			console.log('salvage :-(');
			client.post_action('salvage', {
				count: $scope.batch_quantity
			});
		}

		$scope.assemble = function(model) {
			console.log('assemble :', model);
			client.post_action('assemble', {
				count: $scope.batch_quantity,
				model: model
			});
		}

		$scope.disassemble = function(model) {
			console.log('disassemble :', model);
			client.post_action('disassemble', {
				count: $scope.batch_quantity
			});
		}

	}

});
