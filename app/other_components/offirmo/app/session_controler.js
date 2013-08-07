/* Session
 * singleton object representing the current session
 */
if (typeof define !== 'function') { var define = require('amdefine')(module) }

define(
[
	'offirmo/account/session'
],
function(Session) {
	"use strict";

	Session
	var SessionCtrl = function($scope) {

		$scope.identities = [];
		$scope.current_identity = undefined;

		$scope.apps = [];
		$scope.current_app = undefined;
	};

	return SessionCtrl;
});
