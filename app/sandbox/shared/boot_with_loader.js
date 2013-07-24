/*
 * This file should be included in a web page like that :
<script src="../other_components/quartermaster.js/quartermaster.js"></script>
<script data-main="shared/components.js" src="../bower_components/requirejs/require.js"></script>
<script src="shared/boot.js"></script>
 */

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
