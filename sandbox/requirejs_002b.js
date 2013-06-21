
// alias/paths
require.config({
	baseUrl: '../bower_components/',
	map: {
		'*': {
			'css':  '../bower_components/require-css/css',
			//'less': '../bower_components/require-less/less'
		}
	},
	paths: {
		jquery:     'jquery/jquery',
		underscore: 'underscore/underscore', // TODO replace with lazy.js ?
		backbone:   'backbone/backbone',
		bootstrap:  '../other_components/bootstrap/js/bootstrap',
	},
	shim: {
		'jquery': {
			exports: '$'
		},
		'underscore': {
			exports: '_'
		},
		'backbone': {
			deps: ['underscore', 'jquery'],
			exports: 'Backbone'
		},
		'bootstrap': {
			deps: ['jquery', 'css!../other_components/bootstrap/css/bootstrap']
		}
	},
	config: {
		'toto': {
			size: 'large'
		}
	}
});

main();
