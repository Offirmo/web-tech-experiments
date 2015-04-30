'use strict';

console.log('Hello from app.js !');

define([
	'angularAMD',
	'angular-ui-router',
	'angular-ui-router-extras',
	'bootstrap'
], function (angularAMD) {
	console.log('starting app...');
	var app = angular.module('App', ['ui.router', 'ct.ui.router.extras']);

	app.controller('AppCtrl', ['$q', '$scope', function($q, $scope) {
		$scope.title = 'Angular full app test 001';
		$scope.snippet = 'Routing with lazy loading !';
		$scope.scoped_angular = angular;
	}]);

	app.config(['$urlRouterProvider', '$stateProvider', '$futureStateProvider', '$controllerProvider',
	function($urlRouterProvider, $stateProvider, $futureStateProvider, $controllerProvider) {

		// For any unmatched url, redirect to 404 TODO
		//$urlRouterProvider.otherwise('/404');
		//
		// Now set up the states
		$stateProvider
		.state('landing', {
			url: '/',
			templateUrl: 'angular_app_001/partial_home.html'
		})
		.state('404', {
			url: '/404',
			templateUrl: 'angular_app_001/404.html'
		});

		// register AngularAMD ngload state factory
		$futureStateProvider.stateFactory('ngload', ngloadStateFactory);

		// TODO eventually : load from json
		$futureStateProvider.addResolve(function() {
			console.log('resolving...');
			$futureStateProvider.futureState({
				"stateName": "game1",
				"urlPrefix": "/game1",
				"type": "ngload",
				"src": "angular_app_001/game1/index.js"
			});
		});
	}]);

//			function(event, toState, toParams, fromState, fromParams){ ... })
	app.run(function ($rootScope, $state) {
		//$rootScope.$state = $state;
		$rootScope.$on("$stateChangeStart", function() {
			console.log('$stateChangeStart', arguments);
		});
		$rootScope.$on("$stateChangeSuccess", function() {
			console.log('$stateChangeSuccess', arguments);
		});
		$rootScope.$on("$stateNotFound", function() {
			// event, unfoundState, fromState, fromParams
			console.log('$stateNotFound', arguments);
		});
		$rootScope.$on("$stateChangeError", function() {
			// event, toState, toParams, fromState, fromParams, error
			console.log('$stateChangeError', arguments);
		});
		$rootScope.$on("$viewContentLoading", function() {
			// event, toState, toParams, fromState, fromParams, error
			console.log('$viewContentLoading', arguments);
		});
		$rootScope.$on("$viewContentLoaded", function() {
			// event, toState, toParams, fromState, fromParams, error
			console.log('$viewContentLoaded', arguments);
		});
	});

	function ngloadStateFactory($q, futureState) {
		var ngloadDeferred = $q.defer();
		require([ "ngload!" + futureState.src , 'ngload', 'angularAMD'],
				function ngloadCallback(result, ngload, angularAMD) {
					angularAMD.processQueue();
					ngloadDeferred.resolve(result.entryState);
				});
		return ngloadDeferred.promise;
	}


	// Tell angularAMD to tell angular to bootstrap our app
	angularAMD.bootstrap(app);
	// return app for requireJS registration
	return app;
});
