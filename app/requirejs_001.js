
// alias/paths
require.config({
	paths: {
		jquery: '../bower_components/jquery/jquery'
	},
	shim: {
		'jquery': {
			//deps: [ "underscore" ],
			exports: '$'
		}
	}
});

// module commun à tout le site
define(
'app',
[
	'jquery'
],
function($) {
	document.body.appendChild(document.createTextNode('Hello from loaded app code ! (jQuery version:' +  $.fn.jquery + ')'));
	console.log();
});

// on charge le module commun
require(['app']);
