/* Require.js definitions
 */

require.config({
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
			'rdust': 'other_components/require-dust/require-dust'
		}
	},
	/////////////////////
	paths: {
		// shim plugins
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
		'bootstrap': [
			//'http//netdna.bootstrapcdn.com/twitter-bootstrap/2.3.1/js/bootstrap',
			//'http//cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/2.3.1/js/bootstrap',
			'other_components/bootstrap/js/bootstrap'
		],
		'bootstrap-rem': 'other_components/empty/empty', // no js (for now), css only
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
		'graphic-javascript-tree': 'other_components/graphic-javascript-tree/ECOTree',
		// this plugin should really be aliased 'dust' for rdust to work properly
		'dust': 'bower_components/dustjs-linkedin/dist/dust-full-1.2.5'
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
			deps: [ 'jquery', 'css!other_components/bootstrap/css/bootstrap' ]
		},
		'bootstrap-rem': {
			deps: [ 'bootstrap', 'css!other_components/bootstrap-rem/bootstrap-rem' ]
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
		'graphic-javascript-tree': {
			deps: [ 'css!other_components/graphic-javascript-tree/ECOTree' ]
			// exports ?
		},
		'dust' : {
			// no deps
			exports: 'dust'
		}
	},
	/////////////////////
	config: {
		'toto': {
			size: 'large'
		}
	}
});

if (typeof Q === 'undefined'){
	// should never happen since we (supposedly) embed it in the html just before this one !
	document.getElementById('q-loader-msg').innerHTML = 'Error loading loader itself ! (from component.js)';
}
Q.init();

// tested for require.js 2.1.6
Q.original_requirejs_load  = require.load;
Q.original_requirejs_module_check = undefined;

// we override this function as an *entry point* only
// (we need the "context" variable)
require.load = function(context, moduleName, url) {
	if( !Q.original_requirejs_module_check ) {
		// this precious method is called both for load and after load, great !
		Q.original_requirejs_module_check = context.Module.prototype.check;
		context.Module.prototype.check = function () {
			Q.register_expected_rsrc( this.map.name, "[" + this.map.url + "]" );
			var return_value = Q.original_requirejs_module_check.call(this);
			if(this.defined)
				Q.report_loaded_rsrc( this.map.name );
			return return_value;
		};
	}

	return Q.original_requirejs_load.call(this, context, moduleName, url);
};

require.onError = function(err) {
	// The error has a list of modules that failed
	var failedId = err.requireModules && err.requireModules[0];
	Q.error( err.message );
	Q.report_missing_rsrc( failedId );
	throw err;
};

window.main();
