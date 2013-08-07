/* Session controler for angular
 */
if (typeof define !== 'function') { var define = require('amdefine')(module) }

define(
[
	'offirmo/account/session'
],
function(Session) {
	"use strict";

	var SessionCtrl = function($scope, current_session) {

		$scope.identities = [];
		$scope.current_identity = undefined;

		$scope.apps = [];
		$scope.current_app = undefined;
	};

	return SessionCtrl;
});
