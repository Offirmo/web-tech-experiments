

var richui = {
	// constants
	BACKGROUND_Z_INDEX:          -1000,
	MAIN_Z_INDEX:                1000,
	
	// vars
	//background_image:            undefined,
	//background_svg:              undefined,
	richui_elements_map:         {},
	rem_check_jquery_element:    undefined,
	
	// shortcuts
	main_richui_element:         undefined,
	background_richui_element:   undefined,
	
	// cache
	window_width:           undefined,
	window_height:          undefined,
	window_wh_ratio:        undefined,
	current_main_scale:     undefined,
	
	// convention over configuration...
	default_main_owidth:         1920,
	default_main_oheight:        1080,
	default_main_owh_ratio:      1920./1080.,
	//default_main_odiagonal:      2202.907,
	default_rem_size_px:         20,
	
	
	
	
	
	
	
	/////// richui elements manipulation ///////
	compute_unique_jquery_element_key: function(jquery_element) {
		// TODO improve
		return jquery_element.selector;
	},
	get_entry: function(p_jquery_element) {
		var key = this.compute_unique_jquery_element_key( p_jquery_element );
		return this.richui_elements_map[key];
	},
	create_entry_if_needed_and_get: function(p_jquery_element) {
		var key = this.compute_unique_jquery_element_key( p_jquery_element );
		var current_entry = this.richui_elements_map[key];
		if(current_entry === undefined) {
			var ow = p_jquery_element.outerWidth();
			var oh = p_jquery_element.outerHeight();
			var w  = p_jquery_element.width();
			var h  = p_jquery_element.height();
			var iw = p_jquery_element.innerWidth();
			var ih = p_jquery_element.innerHeight();
			
			// enable svg, see jquery.svg
			p_jquery_element.svg({
				onLoad: function(svg) {
					Q.info("svg loaded !");
				}
			});
			
			var new_entry = {
				nickname:             "",
				auto_generated:       false, // by default
				jquery_element:       p_jquery_element,
				jquery_svg_element:   p_jquery_element.find("svg"), // xxx already available ?
				svg_plane:            p_jquery_element.svg('get'), // xxx already available ?
				//svg_base_group:       undefined, // a group from which every drawing group must inherit for scaling reason
				z_index:              0, // default
				
				/////// background
				background_enabled:   false, // enabled by default
				background_options:   {
					bg_color:             "rgba(0,0,0,0)",
					bg_picture:           undefined
					// cover mode
					// TODO more
					                   },
				background_uptodate:   false,
				
				/////// scaling
				scaling_enabled:      false,
				scaling_options:      {
					reference_owidth:       ow,
					reference_oheight:      oh,
					reference_owh_ratio:    ow/oh,
					w_margin:               ow - w,
					h_margin:               oh - h,
					scaling_mode:           "cover",
					biggest_dimension_size_in_percent_of_window: 100,
					// TODO more
					                   },
				scaling_infos:        {
					initial_owidth:       ow,
					initial_oheight:      oh,
					initial_owh_ratio:    ow/oh,
					initial_w_margin:     ow - w,
					initial_h_margin:     oh - h,
					                   },
				scaling_uptodate:     false,
				
				/////// placement
				placement_enabled:    false,
				placement_options:    {
					placement_mode:       "center"
					// TODO more
					                   },
				placement_uptodate:   false,
				
				/////// debug
				debug_enabled:        false,
				debug_uptodate:       false,
			};
			this.richui_elements_map[key] = new_entry;
		}
		return this.richui_elements_map[key];
	},
	prepare_richui_element: function(richui_element) {
		// common style initializations
		var jquery_element = richui_element.jquery_element;
		
		// needed for correct positionning since we handle positionning ourselves
		jquery_element.css("position",   "absolute");
		
		var jquery_svg_element = richui_element.jquery_svg_element;
		jquery_svg_element[0].setAttribute("viewBox", "0 0 " + richui_element.scaling_options.reference_owidth.toString() + " " + richui_element.scaling_options.reference_oheight.toString() );
		jquery_svg_element[0].setAttribute("preserveAspectRatio", "xMidYMid meet" );

		jquery_svg_element.css({
			"position": "absolute",
			"z-index":  richui_element.z_index - 1,
			// strange, but absolute position is relative TODO investigate
			"top":   0,
			"left":  0
		});
	},
	
	
	
	
	
	
	
	
	/////// main init func, to call first
	init: function() {
		var richui = this;
		
		// since we'll mess with rem, need to set root font size to a precise value
		// xxx toreview
		//$("html").css("font-size",   this.default_font_size_px);

		// setup rem-checking div
		var new_element = document.createElement("div");
		document.body.appendChild( new_element );
		this.rem_check_jquery_element = $(new_element);
		// give this empty elem a default size for correct scaling initialization
		this.rem_check_jquery_element.css({ "height": "1rem", "width": "2rem"});
		this.rem_check_jquery_element.css({ "position": "absolute", "z-index": "-10000"});
		
		// http://stackoverflow.com/questions/2996431/detect-when-a-window-is-resized-using-javascript
		$(window).resize(function() {
			richui.on_window_resize();
		});
		// initial call (useful ?)
		this.on_window_resize();
	},
	/////// other init functions ///////
	// main div //
	init_main_div: function(jquery_element, options) {
		if( this.main_richui_element !== undefined ) {
			Q.error("can't replace main element !");
			throw("can't replace main element !");
		}
		
		// use a common init method
		var richui_element = this.init_element( jquery_element, options, "richui_main", {
			// default options
			placement_mode:   "center",
			
			scaling_mode:     "cover",
			reference_owidth:    this.default_main_owidth,
			reference_oheight:   this.default_main_oheight,
			biggest_dimension_size_in_percent_of_window: 100,
		} );
		richui_element.nickname = "main";
		
		this.main_richui_element = richui_element;
		
		// element specialization
		var jquery_element = richui_element.jquery_element;
		// TODO
		jquery_element.css("z-index",    this.MAIN_Z_INDEX);
	
		// eventually...
		this.schedule_refresh();
	},
	// background div //
	init_background_div: function( jquery_element, options ) {
		if( this.background_richui_element !== undefined ) {
			Q.error("can't replace background element !");
			throw("can't replace background element !");
		}
		
		// use a common init method
		var richui_element = this.init_element( jquery_element, options, "richui_background", {
			// default options
			} );
		richui_element.nickname = "background";
		this.background_richui_element = richui_element;

		// element specialization
		var jquery_element = richui_element.jquery_element;
	
		// TODO enhance
		// needed for container min-height
		jquery_element.css("height",     "100%");
		jquery_element.css("width",      "100%");
		
		// needed for correct display regardless of where the div was put
		// xxx toreview
		jquery_element.css("z-index",    this.BACKGROUND_Z_INDEX);
		
		// eventually...
		this.schedule_refresh();
	},
	
	
	
	
	
	
	
	/////// callbacks ///////
	on_window_resize: function() {
		Q.info("resize !");
		
		// invalidate all
		for(var key in this.richui_elements_map) {
			this.invalidate_richui_element_following_resize( this.richui_elements_map[key] );
		}
		
		// update cache
		this.window_width    = $(window).width();
		this.window_height   = $(window).height();
		this.window_wh_ratio = this.window_width / this.window_height;
		
		// then ask to update calculations
		this.schedule_refresh();
	},
	invalidate_richui_element_following_resize: function(richui_element) {
		if(richui_element.scaling_enabled)   richui_element.scaling_uptodate   = false;
		if(richui_element.placement_enabled) richui_element.placement_uptodate = false;
		if(richui_element.debug_enabled)     richui_element.debug_uptodate     = false;
	},
	schedule_refresh: function() {
		// TODO async / next loop
		this.refresh_richui_elements();
	},
	refresh_richui_elements: function() {
		// main and background first
		if( this.background_richui_element !== undefined)
			this.refresh_richui_element( this.background_richui_element );
		if( this.main_richui_element !== undefined)
			this.refresh_richui_element( this.main_richui_element );
		
		// then remaining
		for(var key in this.richui_elements_map) {
			this.refresh_richui_element( this.richui_elements_map[key] );
		}
	},
	refresh_richui_element: function( richui_element ) {
		// note : order is important !
		/*if(! richui_element.pre_uptodate) {
			this.refresh_pre(richui_element);
		}*/
		this.prepare_richui_element( richui_element ); // toreview !
		
		var update_done = false;
		if(richui_element.scaling_enabled && ! richui_element.scaling_uptodate) {
			this.refresh_scaling(richui_element);
			update_done = true;
		}
		if(richui_element.placement_enabled && ! richui_element.placement_uptodate) {
			this.refresh_placement(richui_element);
			update_done = true;
		}
		if(richui_element.background_enabled && ! richui_element.background_uptodate) {
			this.refresh_background(richui_element);
			update_done = true;
		}
		if(richui_element.debug_enabled && ! richui_element.debug_uptodate) {
			this.refresh_debug(richui_element);
			update_done = true;
		}
		if( update_done ) {
			this.refresh_post( richui_element );
		}
	},
	refresh_scaling: function(richui_element) {
		var jquery_element = richui_element.jquery_element;
		
		// to properly scale,
		// we will compute desired outer dimensions
		// then convert to standard dimensions
		
		// init : dimensions = current window dimensions
		var scale = 1.; // so far
		var oh = this.window_height;
		var ow = this.window_width;
		
		if( richui_element.scaling_options.scaling_mode === "cover" ) {
			if( this.window_wh_ratio > richui_element.scaling_options.reference_owh_ratio ) {
				// limiting dimension is h
				oh = oh * richui_element.scaling_options.biggest_dimension_size_in_percent_of_window / 100.;
				ow = oh * richui_element.scaling_options.reference_owh_ratio;
				scale = oh / richui_element.scaling_options.reference_oheight;
			}
			else {
				// limiting dimension is w
				ow = ow * richui_element.scaling_options.biggest_dimension_size_in_percent_of_window / 100.;
				oh = ow / richui_element.scaling_options.reference_owh_ratio;
				scale = ow / richui_element.scaling_options.reference_owidth;
			}
		}
		else {
			throw("unknown scaling mode : '" + richui_element.scaling_options.scaling_mode + "' !");
		}
		
		// eventually, scale
		// TODO rounding
		var h = Math.floor(oh - richui_element.scaling_options.h_margin);
		var w = Math.floor(ow - richui_element.scaling_options.w_margin);
		jquery_element.css({ "height": h.toString() + "px", "width": w.toString() + "px"});
		
		// is this the main elem ?
		if( richui_element.nickname === "main" ) {
			// store current scale
			this.current_main_scale = scale;
			
			var current_rem_px_size = this.rem_check_jquery_element.height(); // debug
			
			// recompute the root font size to achieve desired rem
			var desired_font_size = this.default_rem_size_px * scale;
			
			// update the root font
			$('html').css({"font-size": desired_font_size.toString() + "px"});
		}
		
		richui_element.scaling_uptodate = true;
	},
	refresh_placement: function(richui_element) {
		var jquery_element = richui_element.jquery_element;
		
		// to properly compute positions,
		// we will work with outer dimensions
		var x = 0;
		var y = 0;
		
		var oh = jquery_element.outerHeight();
		var ow = jquery_element.outerWidth();
		
		if( richui_element.placement_options.placement_mode === "center" ) {
			x = Math.floor( (this.window_width  - ow) / 2 );
			y = Math.floor( (this.window_height - oh) / 2 );
		}
		else {
			throw("unknown placement mode : '" + richui_element.placement_options.placement_mode + "' !");
		}
		
		// eventually, apply
		jquery_element.css({
			"top":   y,
			"left":  x
		});
		
		richui_element.placement_uptodate = true;
	},
	refresh_background: function(richui_element) {
		var jquery_element = richui_element.jquery_element;
		
		jquery_element.css("background",      richui_element.background_options.bg_color);
		
		if( richui_element.background_options.bg_picture !== undefined )
		{
			/* thank you http://css-tricks.com/perfect-full-page-background-image/ */
			jquery_element.css("background",      "url(" + richui_element.background_options.bg_picture + ") no-repeat center center fixed");
			jquery_element.css("background-size", "cover, auto"); // need vendor prefix or does jQuery handle it ?
			/*-webkit-background-size: cover, auto;
			-moz-background-size: cover, auto;
			-o-background-size: cover, auto;
			-khtml-background-size: cover, auto;
			background-size: cover, auto;*/
		}
		
		richui_element.background_uptodate = true;
	},
	refresh_debug: function(richui_element) {
		var jquery_element = richui_element.jquery_element;
		// http://stackoverflow.com/questions/3437786/how-to-get-web-page-size-browser-window-size-screen-size-in-a-cross-browser-wa
		jquery_element.find("tr#richui-debug-x           > td").text( jquery_element.x );
		jquery_element.find("tr#richui-debug-y           > td").text( jquery_element.x );
		jquery_element.find("tr#richui-debug-height      > td").text( jquery_element.height() );
		jquery_element.find("tr#richui-debug-width       > td").text( jquery_element.width() );
		jquery_element.find("tr#richui-debug-innerheight > td").text( jquery_element.innerHeight() );
		jquery_element.find("tr#richui-debug-innerwidth  > td").text( jquery_element.innerWidth() );
		jquery_element.find("tr#richui-debug-outerheight > td").text( jquery_element.outerHeight() );
		jquery_element.find("tr#richui-debug-outerwidth  > td").text( jquery_element.outerWidth() );
		richui_element.debug_uptodate = true;
	},
	refresh_post: function(richui_element) {
		var jquery_element = richui_element.jquery_element;
		
		var ih = jquery_element.innerHeight();
		var iw = jquery_element.innerWidth();
		
		richui_element.jquery_svg_element[0].setAttribute("width",  iw.toString() );
		richui_element.jquery_svg_element[0].setAttribute("height", ih.toString() );
		richui_element.jquery_svg_element.css({ "height": ih.toString() + "px", "width": iw.toString() + "px"});
	},
	
	
	
	///////
	debug_div: function(jquery_div_element) {
		this.prepare_debug_div(jquery_div_element);
		this.register_debug_div(jquery_div_element);
	},
	prepare_debug_div: function(jquery_div_element) {
		var debug_area = document.createElement("div");
		debug_area.innerHTML = '<table class="table table-condensed richui-debug">' +
			'<tbody>' +
				'<tr id="richui-debug-x">' +
					'<th>x =</th>' +
					'<td>...</td>' +
				'</tr>' +
				'<tr id="richui-debug-y">' +
					'<th>y =</th>' +
					'<td>...</td>' +
				'</tr>' +
				'<tr id="richui-debug-height">' +
					'<th>height =</th>' +
					'<td>...</td>' +
				'</tr>' +
				'<tr id="richui-debug-width">' +
					'<th>width =</th>' +
					'<td>...</td>' +
				'</tr>' +
				'<tr id="richui-debug-innerheight">' +
					'<th>innerHeight =</th>' +
					'<td>...</td>' +
				'</tr>' +
				'<tr id="richui-debug-innerwidth">' +
					'<th>innerWidth =</th>' +
					'<td>...</td>' +
				'</tr>' +
				'<tr id="richui-debug-outerheight">' +
					'<th>outerHeight =</th>' +
					'<td>...</td>' +
				'</tr>' +
				'<tr id="richui-debug-outerwidth">' +
					'<th>outerWidth =</th>' +
					'<td>...</td>' +
				'</tr>' +
			'</tbody>' +
		'</table>';
		jquery_div_element.append(debug_area);
	},
	register_debug_div: function(jquery_div_element) {
		var richui_element = this.create_entry_if_needed_and_get( jquery_div_element );
		richui_element.debug_enabled = true;
		this.schedule_refresh();
	},
	
	
	
	
	
	
	
	///////
	init_element: function( jquery_element, options, default_id, default_options ) {
		
		// resolve params
		if( jquery_element !== undefined )
		{
			// is it really a jQuery element ?
			// TODO better test ?
			if( jquery_element.jquery !== undefined ) //&& jquery_element.context.selector !== undefined )
			{
				// OK, this is a jquery element
			}
			else
			{
				// not a jq element, must be options
				if( options !== undefined )
				{
					throw "bad params !";
				}
				else
				{
					// switch stuff
					options = jquery_element;
					jquery_element = undefined;
				}
			}
		}
		
		var auto_generated = false;
		if( jquery_element === undefined )
		{
			// create it ourselves
			var new_element = document.createElement("div");
			document.body.appendChild( new_element );
			jquery_element = $(new_element);
			// give this empty elem a default size for correct scaling initialization
			jquery_element.css({ "height": this.default_main_oheight.toString() + "px", "width": this.default_main_owidth.toString() + "px"});
			auto_generated = true;
		}
		
		options || (options = default_options);
		
		// we should now have everything
		var richui_element = this.create_entry_if_needed_and_get( jquery_element );
		richui_element.auto_generated = auto_generated;
		
		// parse default options
		for(var key in default_options) {
			this.update_richui_element_option( richui_element, key, default_options[key] );
		}
		for(var key in options) {
			this.update_richui_element_option( richui_element, key, options[key] );
		}
		
		this.prepare_richui_element( richui_element );
		
		return richui_element;
	},
	update_richui_element_option: function( richui_element, option_key, option_value ) {
		if( option_key === "bg_color" ) {
			richui_element.background_enabled = true;
			richui_element.background_uptodate = false;
			richui_element.background_options.bg_color = option_value;
		}
		else if( option_key === "bg_picture" ) {
			richui_element.background_enabled = true;
			richui_element.background_uptodate = false;
			richui_element.background_options.bg_picture = option_value;
		}
		else if( option_key === "placement_mode" ) {
			richui_element.placement_enabled = true;
			richui_element.placement_uptodate = false;
			richui_element.placement_options.placement_mode = option_value;
		}
		else if( option_key === "scaling_mode" ) {
			richui_element.scaling_enabled = true;
			richui_element.scaling_uptodate = false;
			richui_element.scaling_options.scaling_mode = option_value;
		}
		else if( option_key === "biggest_dimension_size_in_percent_of_window" ) {
			richui_element.scaling_enabled = true;
			richui_element.scaling_uptodate = false;
			richui_element.scaling_options.biggest_dimension_size_in_percent_of_window = option_value;
		}
		else if( option_key === "reference_owidth" ) {
			richui_element.scaling_enabled = true;
			richui_element.scaling_uptodate = false;
			richui_element.scaling_options.reference_owidth = option_value;
			// refresh linked vars
			richui_element.scaling_options.reference_owh_ratio = option_value / richui_element.scaling_options.reference_oheight;
		}
		else if( option_key === "reference_oheight" ) {
			richui_element.scaling_enabled = true;
			richui_element.scaling_uptodate = false;
			richui_element.scaling_options.reference_oheight = option_value;
			// refresh linked vars
			richui_element.scaling_options.reference_owh_ratio = richui_element.scaling_options.reference_owidth / option_value;
		}
		else
		{
			throw("unknown option : '" + option_key + "' !");
		}
	},
	///////
	change_element_options: function( jquery_element, options ) {
		var richui_element = this.get_entry( jquery_element );
		if( richui_element === undefined ) {
			throw("this element is unknown to richui !");
		}
		
		this.change_richui_element_options( richui_element, options );
	},
	change_richui_element_options: function( richui_element, options ) {
		for(var key in options) {
			this.update_richui_element_option( richui_element, key, options[key] );
		}
		
		this.schedule_refresh();
	},
	change_background_options: function( options ) {
		this.change_richui_element_options( this.background_richui_element, options );
	},
	get_richui_element: function( jquery_element ) {
		var richui_element = undefined;
		if( jquery_element === undefined )
			richui_element = this.main_richui_element;
		else
			richui_element = this.get_entry( jquery_element );
		
		return richui_element;
	},
	get_svg_plane: function( jquery_element ) {
		return this.get_richui_element( jquery_element ).svg_plane;
	},
	
}; // richui
