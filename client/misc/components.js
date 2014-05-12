/* Require.js definitions
 */

console.log('starting require js config...');

requirejs.config({

	// base URL from which component files will be searched
	// NOTE 1 : non-rsrc url below may not be affected by baseUrl
	// NOTE 2 : relative baseUrl base refers to *the calling html* !
	baseUrl: '',

	// http://requirejs.org/docs/api.html#config-enforceDefine
	enforceDefine: false,

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
			'rdust': 'bower_components/require-dust/rdust',
			//'rdust': 'other_components/require-dust/require-dust',
			// an extension to be able to wait for the DOM to be ready
			'domReady': 'bower_components/requirejs-domready/domReady',
			// transparently replace undercore with lodash
			'underscore' : 'lodash',
			'bootstrap3' : 'bootstrap'
		}
	},


	/////////////////////
	paths: {
		// AMD plugins (dirs or direct)
		'base-objects'        : '../incubator/base-objects.js', // dir
		'extended-exceptions' : '../incubator/extended-exceptions.js/extended_exceptions', // direct
		'jquery'              : 'bower_components/jquery/dist/jquery',
		'network-constants'   : '../incubator/network-constants.js', // dir
		'restlink'            : 'other_components/restlink.js', // dir
		// shim plugins
		'accounting'          : 'bower_components/accounting/accounting',
		'angular'             : 'bower_components/angular/angular',
		'angular-isotope'     : 'bower_components/angular-isotope/dist/angular-isotope',
		'angular-bootstrap'   : 'bower_components/angular-bootstrap/ui-bootstrap-tpls',
		'angular-route'       : 'bower_components/angular-route/angular-route',
		'backbone'            : 'bower_components/backbone/backbone',
		'backbone-associations': 'bower_components/backbone-associations/backbone-associations',
		//'bootstrap-rem'       : 'other_components/bootstrap-rem/bootstrap-rem',
		'bootstrap'           : 'bower_components/bootstrap-css/js/bootstrap',
		'buzz'                : 'bower_components/buzz/dist/buzz',
		'chai'                : 'bower_components/chai/chai',
		'chai-as-promised'    : 'bower_components/chai-as-promised/lib/chai-as-promised',
		'ckeditor'            : 'bower_components/ckeditor/ckeditor',
		// dust : this plugin should really be aliased 'dust' for rdust to work properly
		'dust'                : 'bower_components/dustjs-linkedin/dist/dust-full',
		'dust-helpers'        : 'bower_components/dustjs-linkedin-helpers/dist/dust-helpers',
		'ecotree'             : 'other_components/ecotree/ECOTree',
		'fullpage'            : 'other_components/fullpage/jquery.fullPage',
		'javascript-state-machine': 'bower_components/javascript-state-machine/state-machine',
		'jpanelmenu'          : 'bower_components/jpanelmenu/jquery.jpanelmenu',
		'jquery.ui'           : 'other_components/jquery.ui/js/jquery-ui.custom',
		'jquery.svg'          : 'bower_components/jquery.svg/jquery.svg',
		'jquery.datatables'   : 'bower_components/datatables/media/js/jquery.dataTables',
		'jquery.datatables.ui': 'bower_components/datatables/media/js/jquery.dataTables',
		'json2'               : 'bower_components/json2/json2',
		'jsoneditor'          : 'bower_components/jsoneditor/jsoneditor',
		'isotope'             : 'bower_components/isotope/jquery.isotope',
		'lodash'              : 'bower_components/lodash/dist/lodash',
		'magnific-popup'      : 'bower_components/magnific-popup/dist/jquery.magnific-popup',
		'mocha'               : 'bower_components/mocha/mocha',
		'moment'              : 'bower_components/momentjs/moment',
		'onepage-scroll'      : 'bower_components/onepage-scroll/jquery.onepage-scroll',
		'rdust'               : 'bower_components/require-dust/rdust',
		'spin'                : 'bower_components/spin.js/spin',
		'store'               : 'bower_components/store.js/store',
		'type-check'          : 'other_components/type-check/browser/type-check',
		//'underscore'          : 'bower_components/underscore/underscore', // TODO replace with lazy.js or LO dash ?
		'when'                : 'bower_components/when/when'
	},


	/////////////////////
	shim: {
		'accounting' : {
			// no deps
			exports: 'accounting'
		},
		'angular': {
			deps: [ 'jquery' ], // Note : angular needs jQuery for some features
			exports: 'angular'
		},
		'angular-isotope': {
			deps: [ 'angular', 'isotope' ]
		},
		'angular-bootstrap': {
			deps: [ 'angular', 'bootstrap3' ]
		},
		'angular-route': {
			deps: [ 'angular' ]
		},
		'backbone': {
			deps: [ 'underscore', 'jquery' ], // Note : bb needs jQuery for some features
			exports: 'Backbone'
		},
		'backbone-associations': {
			deps: [ 'backbone' ]
		},
		'bootstrap': {
			// js needs jQuery http://getbootstrap.com/getting-started/#whats-included
			deps: [ 'jquery',
			        'css!bower_components/bootstrap-css/css/bootstrap' ]
		},
		/*'bootstrap-rem': {
			deps: [ 'bootstrap',
			        'css!other_components/bootstrap-rem/bootstrap-rem' ]
		},*/
		'ckeditor': {
			exports: 'CKEDITOR',
			init: function () {
				// base init
				CKEDITOR.disableAutoInline = true;
			}
		},
		'dust' : {
			// no deps
			exports: 'dust'
		},
		'dust-helpers' : {
			deps: [ 'dust' ],
			exports: 'dust'
		},
		'ecotree': {
			deps: [ 'css!other_components/ecotree/ECOTree' ]
			// exports ?
		},
		'fullpage' : {
			deps: [
				'jquery',
				'css!other_components/fullpage/jquery.fullPage'
			]
		},
		'javascript-state-machine' : {
			// no deps
			exports: 'StateMachine'
		},
		'jpanelmenu' : {
			deps: [
				'jquery'
			],
			init: function ($) {
				// http://jpanelmenu.com/
				var jPM = $.jPanelMenu();
				return jPM;
			}
		},
		'jquery.ui': {
			deps: [
				'jquery',
				'bootstrap-rem', // so we make sure bootstrap css are applied first
				// Theme : select only one !
				//'css!../contrib/jquery.ui/themes/smoothness/jquery-ui-1.10.2.custom.css', // smoothness theme
				'css!bower_components/jqueryuibootstrap/css/custom-theme/jquery-ui-1.10.0.custom' // bootstrap theme
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
		'jsoneditor': {
			deps: [
				'jquery',
				'css!bower_components/jsoneditor/jsoneditor'
			],
			exports: 'jsoneditor'
		},
		'isotope' : {
			deps: [
				'jquery'
			]
		},
		'magnific-popup' : {
			deps: [
				'jquery',
				'css!bower_components/magnific-popup/dist/magnific-popup'
			]
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
		},
		'onepage-scroll': {
			deps: [
				'jquery',
				'css!bower_components/onepage-scroll/onepage-scroll'
			]
		},
		'rdust' : {
			deps: [ 'dust-helpers' ]
		},
		'spin' : {
			exports: 'Spinner'
		},
		'store': {
			deps: [ 'json2' ],
			exports: 'store'
		},
		'lodash': {
			exports: '_'
		}
	},


	/////////////////////
	config: {
		'toto': {
			size: 'large'
		}
	}
});

console.log('require js config done.');

// Start the main app logic.

// not optimal to wait for the full DOM but good for sharing this file amongst sandbox files
console.log('Waiting for DOM before starting app...');
requirejs(['domReady!'],
function() {
	console.log('DOM ready : starting application logic...');
	window.main();
});
