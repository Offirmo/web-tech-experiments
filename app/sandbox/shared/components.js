/* Require.js definitions
 */

console.log("starting require js config...");

requirejs.config({

	// base URL from which component files will be searched
	// NOTE 1 : non-rsrc url below may not be affected by baseUrl
	// NOTE 2 : relative baseUrl base refers to the calling html !
	baseUrl: '../',

	// require.js extensions (plugins)
	map: {
		'*': {
			// an extension to be able to load any kind of text
			'text': 'bower_components/requirejs-text/text',
			// an extension to be able to load css with require.js
			'css':  'bower_components/require-css/css',
			// an extension to be able to load less stylesheets with require.js
			'less': 'bower_components/require-less/less',
			// an extension to be able to load dust.js templates easily
			'rdust': 'other_components/require-dust/require-dust',
			// an extension to be able to wait for the DOM to be ready
			'domReady': 'bower_components/requirejs-domready/domReady'
		}
	},


	/////////////////////
	paths: {
		// shim plugins
		'angular': [
			'bower_components/angular/angular'
		],
		'jquery': [
			// google ?
			//'http://code.jquery.com/jquery-1.9.1',
			'bower_components/jquery/jquery'
		],
		'underscore': [ // TODO replace with lazy.js ?
			//'http://underscorejs.org/underscore.js', // which version ??
			'bower_components/underscore/underscore'
		],
		'backbone': [
			//'http://backbonejs.org/backbone.js',
			'bower_components/backbone/backbone'
		],
		'backbone-associations': [
			//'http://backbonejs.org/backbone.js',
			'bower_components/backbone-associations/backbone-associations'
		],
		'bootstrap': [
			//'http//netdna.bootstrapcdn.com/twitter-bootstrap/2.3.1/js/bootstrap',
			//'http//cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/2.3.1/js/bootstrap',
			'other_components/bootstrap/js/bootstrap'
		],
		'bootstrap-rem': 'other_components/bootstrap-rem/bootstrap-rem',
		'bootstrap3': [
			'other_components/bootstrap3/js/bootstrap'
		],
		'accounting': [
			'bower_components/accounting/accounting'
		],
		'json2': [
			//'http://cdnjs.cloudflare.com/ajax/libs/json2/20110223/json2.js',
			'bower_components/json2/json2'
		],
		'store': [
			'bower_components/store.js/store'
		],
		'jquery.ui': 'other_components/jquery.ui/js/jquery-ui.custom',
		'jquery.svg': 'bower_components/jquery.svg/jquery.svg',
		'jquery.datatables': 'bower_components/datatables/media/js/jquery.dataTables',
		// alternative for jquery ui
		'jquery.datatables.ui': 'bower_components/datatables/media/js/jquery.dataTables',
		// javascript finite state machine https://github.com/jakesgordon/javascript-state-machine
		'javascript-state-machine': 'other_components/javascript-state-machine/state-machine',
		// javascript customizable spinner http://fgnass.github.com/spin.js/
		'spin': 'bower_components/spin.js/spin',
		'ecotree': 'other_components/ecotree/ECOTree',
		// this plugin should really be aliased 'dust' for rdust to work properly
		'dust': 'bower_components/dustjs-linkedin/dist/dust-full-1.2.5',
		'chai': 'bower_components/chai/chai',
		'mocha': '../node_modules/mocha/mocha',
		'offirmo': 'other_components/offirmo'
	},


	/////////////////////
	shim: {
		'angular': {
			exports: 'angular'
		},
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
		'backbone-associations': {
			deps: [ 'backbone' ]
		},
		'bootstrap': {
			deps: [ 'jquery', 'css!other_components/bootstrap/css/bootstrap' ]
		},
		'bootstrap-rem': {
			deps: [ 'bootstrap', 'css!other_components/bootstrap-rem/bootstrap-rem' ]
		},
		'bootstrap3': {
			// js needs jQuery http://getbootstrap.com/getting-started/#whats-included
			deps: [ 'jquery', 'css!other_components/bootstrap3/css/bootstrap' ]
		},
		'accounting' : {
			// no deps
			exports: 'accounting'
		},
		'json2' : {
			// no deps
		},
		'store': {
			deps: [ 'json2' ],
			exports: 'store'
		},
		'jquery.ui': {
			deps: [
				'jquery',
				'bootstrap-rem', // so we make sure bootstrap css are applied first
				// Theme : select only one !
				//'css!../contrib/jquery.ui/themes/smoothness/jquery-ui-1.10.2.custom.css', // smoothness theme
				'css!bower_components/jqueryuibootstrap/css/custom-theme/jquery-ui-1.10.2.custom' // bootstrap theme
			]
		},
		'jquery.svg': {
			deps: [
				'jquery',
				'css!bower_components/jquery.svg/jquery.svg'
			]
		},
		'jquery.datatables': {
			deps: [
				'jquery',
				'css!bower_components/datatables/media/css/jquery.dataTables'
			]
		},
		// alternative for jquery ui
		'jquery.datatables.jui': {
			deps: [
				'jquery.ui',
				'css!bower_components/datatables/media/css/jquery.dataTables_themeroller'
			]
		},
		'javascript-state-machine' : {
			// no deps
			// exports ?
		},
		'spin' : {
			exports: 'Spinner'
		},
		'ecotree': {
			deps: [ 'css!other_components/ecotree/ECOTree' ]
			// exports ?
		},
		'dust' : {
			// no deps
			exports: 'dust'
		},
		'chai' : {
			// no deps
			// exports ?
		},
		'mocha' : {
			deps: [
				'jquery'
			],
			exports: 'mocha',
			init: function (jquery) {
				console.log('Hello from mocha shim ! Setting up mocha...');
				this.mocha.setup('bdd');
				return this.mocha;
			}
		}
	},


	/////////////////////
	config: {
		'toto': {
			size: 'large'
		}
	}
});

console.log("require js config done.");

// Start the main app logic.
console.log("Waiting for DOM before starting app...");
// not optimal but good for sharing this file amongst sandbox files
requirejs(['domReady!'],
function() {
	console.log("starting application logic...");
	window.main();
});
