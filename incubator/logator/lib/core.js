// if node.js : use amdefine (add it with npm)
if (typeof define !== 'function') { var define = require('amdefine')(module); }

define([
	'lodash'
],
function(_) {
	'use strict';

	var DEFAULT_LOGGER_ID  = 'main';

	// A log call, with a level.
	// Internal use only.
	function BaseLogCall(options) {
		this.logger_id = options.logger_id;
		this.level = options.level;
		this.args = options.args;
		this.date = new Date();
	}

	// logger core, entirely configurable
	function LogCore(logger_id) {
		// check parameters
		logger_id = logger_id || DEFAULT_LOGGER_ID;
		if(!_.isString(logger_id)) throw new Error('Logger id must be a string !');

		this.levels = {}; // existing levels
		this.logger_id = logger_id;
		this.log_sinks = [];

		var log_core = this; // closure

		// inherit (useful ?)
		function CustomizedLogCall() {
			BaseLogCall.prototype.constructor.apply(this, arguments);
			this.log_core = log_core;
		}
		CustomizedLogCall.prototype = Object.create(BaseLogCall.prototype);
		CustomizedLogCall.prototype.constructor = CustomizedLogCall;
		this.LogCall = CustomizedLogCall;
	}

	LogCore.prototype.add_level = function(level, rank, options) {
		// check parameters
		if(!_.isString(level)) throw new Error('Level must be a string !');
		if(! level) throw new Error('Level can’t be empty !');
		if(!_.isNumber(rank)) throw new Error('Rank must be a number !');
		if(level < 0) throw new Error('Level must be >= 0 !');
		if(this.levels[level]) throw new Error('This level is already defined !');

		// record this level
		this.levels[level] = _.defaults({name: level, rank: rank}, options);

		// closure
		var log_level = this.levels[level];

		// add corresponding log primitive
		this[level] = function() {
			//console.log('initiating log call on level "%s"', level);
			// create log call object
			var log_call = new this.LogCall({
				logger_id: this.logger_id,
				level: log_level,
				args: Array.prototype.slice.call(arguments) // because arguments is not an array
			});

			// actually log
			if(! this.log_sinks.length)
				throw new Error('Logger has no sinks ! Please add one !')
			else {
				_.forEach(this.log_sinks, function(log_sink) {
					log_sink(log_call);
				});
			}
		};
	};

	LogCore.prototype.add_sink = function(sink_fn) {
		this.log_sinks.push(sink_fn);
	};

	return {
		make_new: function(logger_id) { return new LogCore(logger_id); }
	};
});
