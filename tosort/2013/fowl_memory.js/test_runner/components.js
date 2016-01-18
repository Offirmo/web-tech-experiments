/* Require.js definitions
 */

console.log("starting require js config...");

requirejs.config({

	// base URL from which component files will be searched
	// NOTE 1 : non-rsrc url below may not be affected by baseUrl
	// NOTE 2 : relative baseUrl base refers to the calling html !
	baseUrl: "",

	// http://requirejs.org/docs/api.html#config-enforceDefine
	enforceDefine: false,

	// require.js extensions (plugins)
	map: {
		'*': {
			// an extension to be able to wait for the DOM to be ready
			"domReady": "bower_components/requirejs-domready/domReady"
		}
	},


	/////////////////////
	paths: {
		// AMD plugins (dirs or direct)
		"extended-exceptions" : "../extended_exceptions",
		// shim plugins
		"chai"                : "bower_components/chai/chai",
		"mocha"               : "bower_components/mocha/mocha"
	},


	/////////////////////
	shim: {
		"mocha" : {
			deps: [ ],
			exports: "mocha",
			init: function () {
				console.log("Hello from mocha shim ! Setting up mocha...");
				this.mocha.setup("bdd");
				return this.mocha;
			}
		}
	}
});

console.log("require js config done.");

// Start the main app logic.

// not optimal to wait for the full DOM but good for sharing this file amongst sandbox files
console.log("Waiting for DOM before starting app...");
requirejs(["domReady!"],
function() {
	console.log("DOM ready : starting application logic...");
	window.main();
});
