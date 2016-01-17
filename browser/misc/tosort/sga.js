

var sga =
{
	///////////////////////////////////////////////
	
	///////////////////////////////////////////////
	global_state_machine: StateMachine.create({
		events:
		[
			// initial state, at init
			{ name: '_init',                from: 'none',              to: '_resizing'         },
			// useful states
			{ name: '_size_updated',        from: '_resizing',         to: '_ready'      },
			{ name: '_start_resize',        from: '_ready',            to: '_resizing' },
			{ name: '_pause',               from: '_ready',            to: '_options' },
			{ name: '_unpause',             from: '_options',          to: '_ready'       },
		],
		callbacks:
		{
			///////
			onenterstate:  function(event, from, to, msg) {
				Q.info("[global_state_machine] transitionning from " + from + " to " + to + "...");
			},
			///////
			/////// STATES ///////
			///////
			onenter_resizing:  function(event, from, to, msg) {
				// TODO hide controls
				//document.getElementById('landing-pane').style.display = 'block';
			},
			onleave_resizing:  function(event, from, to, msg) {
				// TODO resize and display
			},
			///////
			/////// EVENTS ///////
			///////
			onbefore_abort_connection:  function(event, from, to, msg) {
				//Q.warn("[global_state_machine] connection abort requested...");
				// TODO stop cnx callback
			},
		}
	}),
	
	
	
	///////////////////////////////////////////////
	init: function()
	{
		Q.info("*** global init ***");
		
		// disable all panes
		//document.getElementById('landing-pane').style.display    = 'none';
		
		// prepare rsrcs
		//
		// main connection spinner
		// using spin.js
		var connection_spinner_opts = {
		  lines: 9, // The number of lines to draw
		  length: 2, // The length of each line
		  width: 4, // The line thickness
		  radius: 23, // The radius of the inner circle
		  corners: 0.5, // Corner roundness (0..1)
		  rotate: 30, // The rotation offset
		  color: '#000', // #rgb or #rrggbb
		  speed: 1.1, // Rounds per second
		  trail: 75, // Afterglow percentage
		  shadow: false, // Whether to render a shadow
		  hwaccel: true, // Whether to use hardware acceleration
		  className: 'connection-spinner', // The CSS class to assign to the spinner
		  zIndex: 2e9, // The z-index (defaults to 2000000000)
		  top: '20', // Top position relative to parent in px
		  left: 'auto' // Left position relative to parent in px
		};
		//var target = $('#connecting-pane');
		//this.connection_spinner = new Spinner(connection_spinner_opts);

		// setup listeners
		//this.resources.on('sync', this.update_resource_list, this );
		
		// when everything is inited, we can start the state machine
		this.global_state_machine._init();
	},
	
	attempt_global_event: function(event_name) {
		if(this.global_state_machine.cannot(event_name))
		{
			// bad !
			alert("Can't in this state !");
		}
		else
		{
			this.global_state_machine[event_name]();
		}
	},
};


