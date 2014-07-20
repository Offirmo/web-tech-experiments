'use strict';

console.log('Hello from game1.js !');

define(['angularAMD'], function() {
	var app = angular.module("game1", ['ui.router']);

	var mainState = {
		name: 'game1',
		//abstract: true,
		url: '/game1',
		template: '<h1>Game 1 (abstract state)</h1><a ui-sref="game1.landing">go to landing</a><div ui-view></div>'
	};

	var landingState = {
		//name: 'game1.landing',
		//parent: mainState,
		url: "/landing",
		controller: function($scope) {
			console.log("Entered game1.landing controller");
		},
		template: '<h1>Welcome to game 1</h1>'
	};
/*
	var nestedState = {
		name: "module1.state1.nested",
		url: "/nested",
		controller: function($scope) {
			console.log("Entered module1.state1.nested controller");
		},
		template: "<h5>module1.state1.nested</h5>"
	};*/

	console.log('defining game1 states...');

	app.config(['$stateProvider', function ($stateProvider) {
		$stateProvider.state('game1', mainState);
		$stateProvider.state('game1.landing', landingState);
	}]);

	return { entryState: mainState, module: app };
});
