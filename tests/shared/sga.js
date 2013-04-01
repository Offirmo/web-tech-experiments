

var sga =
{
	///////////////////////////////////////////////
	
	///////////////////////////////////////////////
	global_state_machine: StateMachine.create({
		events:
		[
			// initial state, at init
			{ name: '_init',                from: 'none',              to: '_landing'         },
			// useful states
			{ name: '_attempt_connect',     from: '_landing',          to: '_connecting'      },
			{ name: '_abort_connection',    from: '_connecting',       to: '_connection_lost' },
			{ name: '_connection_failed',   from: '_connecting',       to: '_connection_lost' },
			{ name: '_connection_success',  from: '_connecting',       to: '_connected'       },
			{ name: '_disconnect',          from: '_connected',        to: '_connection_lost' },
			{ name: '_ack_conn_lost',       from: '_connection_lost',  to: '_landing'         },
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
			onenter_landing:  function(event, from, to, msg) {
				document.getElementById('landing-pane').style.display = 'block';
			},
			onleave_landing:  function(event, from, to, msg) {
				// disable input field while connecting
				$('#landing-input-server-adress').disabled = true;
				// disable the connect button too
				$('#landing-button-connect').button('loading');
				// and disable everything anyway...
				document.getElementById('landing-pane').style.display = 'none';
			},
			///////
			onenter_connecting:  function(event, from, to, msg) {
				ccf_client.connection_spinner.spin( document.getElementById('connecting-pane') );
				document.getElementById('connecting-pane').style.display = 'block';
			},
			onleave_connecting:  function(event, from, to, msg) {
				document.getElementById('connecting-pane').style.display = 'none';
				ccf_client.connection_spinner.stop();
			},
			///////
			onenter_connected:  function(event, from, to, msg) {
				document.getElementById('connected-pane').style.display = 'block';
			},
			onleave_connected:  function(event, from, to, msg) {
				document.getElementById('connected-pane').style.display = 'none';
			},
			///////
			onenter_connection_lost:  function(event, from, to, msg) {
				document.getElementById('connlost-pane').style.display = 'block';
			},
			onleave_connection_lost:  function(event, from, to, msg) {
				document.getElementById('connlost-pane').style.display = 'none';
			},
			///////
			/////// EVENTS ///////
			///////
			onbefore_abort_connection:  function(event, from, to, msg) {
				Q.warn("[global_state_machine] connection abort requested...");
				// TODO stop cnx callback
			},
			///////
			onafter_attempt_connect:  function(event, from, to, msg) {
				Q.info("[global_state_machine] attempting connection...");
				
				//ccf_client.resources.fetch();
				ccf_client.resources.fetch({ 'success': function(collection, response, options) {
					ccf_client.attempt_global_event('_connection_success');
				}});
			},
		}
	}),
	
	
	///////////////////////////////////////////////
	client_state_machine: StateMachine.create({
		events:
		[
			{ name: '_init',                from: 'none',                          to: '_landing'        },
			{ name: '_select_rsrc',         from: ['_rsrc_display', '_landing'],   to: '_rsrc_display'   },
			{ name: '_return_to_home',      from: ['_rsrc_display', '_landing'],   to: '_landing'        },
		],
		callbacks:
		{
			///////
			onenterstate:  function(event, from, to, msg) {
				Q.info("[client_state_machine] transitionning from " + from + " to " + to + "...");
			},
			///////
			/////// STATES ///////
			///////
			
			///////
			/////// EVENTS ///////
			///////
		}
	}),
	
	
	///////////////////////////////////////////////
	init: function()
	{
		Q.info("*** global init ***");
		
		// disable all panes
		document.getElementById('landing-pane').style.display    = 'none';
		document.getElementById('connecting-pane').style.display = 'none';
		document.getElementById('connected-pane').style.display  = 'none';
		document.getElementById('connlost-pane').style.display   = 'none';
		
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
		//var target = document.getElementById('connecting-pane');
		var target = $('#connecting-pane');
		this.connection_spinner = new Spinner(connection_spinner_opts);

		// setup listeners
		this.resources.on('sync', this.update_resource_list, this );
		
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
	
	update_resource_list: function() {
		var rsrcpick = $('#connected-rsrc-picker');
		rsrcpick.empty();
		
		var post_process_element = function(rsrc) {
			// TODO
		}
		
		var myItems = [];
		this.resources.each(function(element, index, list)
		{
			post_process_element(element);
			myItems.push( "<li><a id=\"connected-rsrc-pick-" + element.get('name') + "\" href=\"#\">" + element.get('name') + "</a></li>" );
		});
		rsrcpick.append( myItems.join("") );
		
		this.resources.each(function(element, index, list)
		{
			$("a#connected-rsrc-pick-" + element.get('name')).click(function() {
				alert(element.get('name'));
				ccf_client.attempt_client_event('_select_rsrc', element.get('name'));
			});
		});
	}
};


