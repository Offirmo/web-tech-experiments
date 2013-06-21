
// alias/paths
require.config({
	baseUrl: '../bower_components/',
	map: {
		'*': {
			'css':  '../bower_components/require-css/css',
			//'less': '../bower_components/require-less/less'
		}
	},
	/////////////////////
	paths: {
		'jquery': [
			// google ?
			//'http://code.jquery.com/jquery-1.9.1',
			'jquery/jquery'
		],
		'underscore': [ // TODO replace with lazy.js ?
			//'http://underscorejs.org/underscore.js', // which version ??
			'underscore/underscore'
		],
		'backbone': [
			//'http://backbonejs.org/backbone.js',
			'backbone/backbone'
		],
		'bootstrap': [
			//'http//netdna.bootstrapcdn.com/twitter-bootstrap/2.3.1/js/bootstrap',
			//'http//cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/2.3.1/js/bootstrap',
			'../other_components/bootstrap/js/bootstrap'
		],
		'bootstrap-rem': '../other_components/empty/empty', // no js (for now), css only
		'accounting': [
			'accounting/accounting'
		],
		'json2': [
			//'http://cdnjs.cloudflare.com/ajax/libs/json2/20110223/json2.js',
			'json2/json2'
		],
		'store': [
			'store.js/store'
		],
		'jquery.ui': '../other_components/jquery.ui/js/jquery-ui-1.10.2.custom',
		'jquery.svg': 'jquery.svg/jquery.svg',
		// javascript finite state machine https://github.com/jakesgordon/javascript-state-machine
		'javascript-state-machine': '../other_components/javascript-state-machine/state-machine',
		// javascript customizable spinner http://fgnass.github.com/spin.js/
		'spin': 'spin.js/spin',
		'graphic-javascript-tree': '../other_components/graphic-javascript-tree/ECOTree',
	},
	/////////////////////
	shim: {
		'jquery': {
			exports: '$'
		},
		'underscore': {
			exports: '_'
		},
		'backbone': {
			deps: [ 'underscore', 'jquery' ], // Note : bb needs jQuery for some features
			exports: 'Backbone'
		},
		'bootstrap': {
			deps: [ 'jquery', 'css!../other_components/bootstrap/css/bootstrap' ]
		},
		'bootstrap-rem': {
			deps: [ 'bootstrap', 'css!../other_components/bootstrap-rem/bootstrap-rem' ]
		},
		'accounting' : { /* no deps */ },
		'json2' : { /* no deps */ },
		'store': {
			deps: [ 'json2' ]
		},
		'jquery.ui': {
			deps: [
				'jquery',
				'bootstrap-rem', // so we make sure bootstrap css are applied first
				// Theme : select only one !
				//'css!../contrib/jquery.ui/themes/smoothness/jquery-ui-1.10.2.custom.css', // smoothness theme
				'css!../bower_components/jqueryuibootstrap/css/custom-theme/jquery-ui-1.10.2.custom', // bootstrap theme
				]
		},
		'jquery.svg': {
			deps: [
				'jquery',
				'css!../bower_components/jquery.svg/jquery.svg'
				]
		},
		'javascript-state-machine' : { /* no deps */ },
		'spin' : { /* no deps */ },
		'graphic-javascript-tree': {
			deps: [ 'css!../other_components/graphic-javascript-tree/ECOTree' ]
		}
	},
	/////////////////////
	config: {
		'toto': {
			size: 'large'
		}
	}
});

main();
