/* Q (quartermaster)
 * is a small, compatible javascript object
 * used for loading other resources.
 * It is usually loaded first, or (even better) directly embedded.
 */

var Q = {
	state:                 'initial',
	expected_rsrc_count:   0, //< count of critical rsrcs we should load
	successful_rsrc_count: 0, //< count of critical rsrcs we have successfully loaded
	failed_rsrc_count:     0, //< count of critical rsrcs we have failed to load
	unmetable_dependency:  false, //< if failure of a rsrc whom other rsrc depend on, set this to true

	content_area: undefined, //< shortcut to the DOM element which holds the content
	loading_area: undefined, //< shortcut to the DOM element which holds the loader
	resources:             {}, //< list of rsrc objects we are loading
	resources_callbacks:   {}, //< list of callbacks to fire when rsrcs are loaded

	/////// Init functions

	/////// main init func, to call first
	init: function() {
		// hide the content while loading is not done
		// (not initially hidden for SEO reason)
		this.content_area = document.getElementById('content');
		this.loading_area = document.getElementById('q-loader');

		this.hide_content();
		this.show_loader();

		// add other SEO unfriendly stuff
		document.getElementById('q-simple-loading-indicator').style.textDecoration="blink";

		// other inits
		this.init_console_();

		this.state = 'inited';
	},
	/////// DOM manipulation
	hide_content: function() {
		this.content_area.style.display = 'none';
	},
	show_content: function() {
		this.content_area.style.display = 'block';
	},
	hide_loader: function() {
		this.loading_area.style.display = 'none';
	},
	show_loader: function() {
		this.loading_area.style.display = 'block';
	},
	/////// sub_init functions
	init_console_: function() {
		// first init with dummy functions
		this.log      = function() {};
		this.debug    = function() {};
		this.info     = function() {};
		this.warn     = function() {};
		this.error    = function() {};
		this.group    = function() {};
		this.groupEnd = function() {};
		this.trace    = function() {};
		this.dir      = function() {};
		this.assert   = function() {};

		// then activate available features
		if ( window.console ) {
			// console is available
			// complex syntax to keep scope and correctly forward args
			// doesn't work in IE8 ?
			this.log      = function() { console.log.apply(console, arguments); };
			this.debug    = function() { console.debug.apply(console, arguments); };
			this.info     = function() { console.info.apply(console, arguments); };
			this.warn     = function() { console.warn.apply(console, arguments); };
			this.error    = function() { console.error.apply(console, arguments); };
			this.group    = function() { console.group.apply(console, arguments); };
			this.groupEnd = function() { console.groupEnd.apply(console, arguments); };
			this.trace    = function() { console.trace.apply(console, arguments); };
			this.dir      = function() { console.dir.apply(console, arguments); };
			this.assert   = function() { console.assert.apply(console, arguments); };
		}
		else
		{
			// console is not available
			// (TODO load firebug lite ?)
		}
	},
	declare_rsrc: function(rsrc_name) {
		elem = {};
		elem.loaded = false;
		elem.load_failed = false;
		this.resources[rsrc_name] = elem;

		this.expected_rsrc_count++;
		Q.log('[Q loader] new rsrc : "' + rsrc_name + '", current count : ' + this.successful_rsrc_count.toString() + '/' + this.expected_rsrc_count.toString());
		document.getElementById('q-expected-rsrc-count').innerHTML = this.expected_rsrc_count;
	},
	register_expected_rsrc: function(rsrc_name, comment) {
		if(rsrc_name === null) {
			Q.warn("[Q loader] expecting null rsrc !");
			return;
		}

		var elem = this.resources[rsrc_name];
		if(elem === undefined) {
			// install this new expected rsrc
			Q.log("[Q loader] expecting rsrc : " + rsrc_name + " " + comment );
			this.declare_rsrc( rsrc_name );
		}
		return true;
	},
	report_loaded_rsrc: function(rsrc_name) {
		this.info("[Q loader] rsrc successfully loaded : ", rsrc_name);

		var elem = this.resources[rsrc_name];
		if(elem === undefined) {
			Q.warn("[Q loader] reporting load of unknown rsrc ! " + rsrc_name);
			this.declare_rsrc( rsrc_name );
			elem = this.resources[rsrc_name];
		}

		if ( elem.loaded )
		{
			// already marked as loaded : ignore
		}
		else
		{
			elem.loaded = true;
			this.successful_rsrc_count++;
			Q.log("[Q loader] current count : " + this.successful_rsrc_count.toString() + '/' + this.expected_rsrc_count.toString());
			if(this.state === 'inited') { // only re-hide the content if it was never displayed
				this.hide_content(); // safety, in case it was displayed back due to a css or anything
			}
			document.getElementById('q-loaded-rsrc-count').innerHTML = this.successful_rsrc_count;
			this.check_completion_();
		}
	},
	report_missing_rsrc: function(rsrc_name) {
		this.error("[Q loader] error loading rsrc : ", rsrc_name);

		// we may have duplicate reports about a failed rsrc
		var elem = this.resources[rsrc_name];
		if(elem === undefined) {
			// impossible ! But happens... (looks like some rsrc don't get declared in order...)
			Q.error("failure reported on unknown rsrc ?? : " + rsrc_name);
			this.declare_rsrc( rsrc_name );
			elem = this.resources[rsrc_name];
		}

		if(! elem.load_failed ) // to filter multiple reports
		{
			elem.load_failed = true;

			this.failed_rsrc_count++;

			var new_entry = document.createElement("li");
			new_entry.innerHTML = "Error loading rsrc : " + rsrc_name;
			document.getElementById('q-loader-log').appendChild(new_entry);
		}
		this.check_completion_();
	},
	/////// check if all crit rsrcs are processed (success or failure)
	/////// and call complete func if needed
	check_completion_: function(rsrc) {
		if(    this.successful_rsrc_count > 1 // to avoid spurious completion on init (1/1)
		    && this.successful_rsrc_count + this.failed_rsrc_count >= this.expected_rsrc_count
		       || this.unmetable_dependency ) {
			this.on_complete_();
		}
	},
	/////// called when all crit rsrcs are processed (success or failure)
	on_complete_: function() {
		// as soon as page is loaded, swap content
		var success = (this.successful_rsrc_count == this.expected_rsrc_count && ! this.unmetable_dependency);
		if( !success )
		{
			document.getElementById('q-loader-msg').innerHTML = 'Application failed to load.';
			document.getElementById('q-loader-msg').style.color = 'red';
		}
		else
		{
			this.state = 'loaded';
			this.show_content();
			this.hide_loader();
		}
	}
}; // Q
