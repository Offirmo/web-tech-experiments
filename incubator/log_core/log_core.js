// if node.js : use amdefine (add it with npm)
if (typeof define !== 'function') { var define = require('amdefine')(module); }

define([
	'underscore'
],
function(_) {
	'use strict';

	var DEFAULT_LOGGER_ID  = 'main';
	var DEFAULT_LEVEL_NAME = 'debug';
	var DEFAULT_LEVEL_RANK = 1;


	// A log line (= log call)
	// with a level and optional tags
	function BaseLogLine(options) {
		options = options || {
			// logger_id
			// default_level
			// level
		};

		// default values
		this.logger_id = options.logger_id || DEFAULT_LOGGER_ID;
		this.level = options.level || options.default_level || {name: DEFAULT_LEVEL_NAME};
		this.tags = [];
		this.args = {};
	}



	// logger core
	function LogCore() {
		this.levels = {};
		this.tags = {};
		this.log_sink = function(log_call, args) {
			console.log.apply(console, args);
		};

		var log_core = this; // closure
		this.LogLine = function() {
			var temp = new BaseLogLine();
			temp.log_core = log_core;
			return temp;
		};
		//this.LogCall.prototype = BaseLogCall.prototype;
	}
	LogCore.prototype.create_call = function() {
		var log_call = new this.LogCall();
		_.forEach(this.tags, function(tag) {
			Object.defineProperty(log_call, tag.name, {get: function(args) {
				console.log('get tag %s (%s)', tag.name, args);
				// save tag
				this.tags.push(this.log_core.tags[tag]);
				if(args)
					this.log_core.log_sink(this, arguments);
				return this;
			}});
		});
		_.forEach(this.levels, function(level) {
			Object.defineProperty(log_call, level.name, {get: function(args) {
				console.log('get level %s (%s)', level.name, args);
				// save level
				this.level = level;
				if(args)
					this.log_core.log_sink(this, arguments);
				return this;
			}});
		});
		return log_call;
	};

	LogCore.prototype.add_level = function(level) {
		this.levels[level] = this.levels[level] || {name: level};
		this.LogCall.prototype[level] = function(args) {
			console.log('level "%s" direct call on log_line', level, this);
			// save level
			this.level = this.log_core.levels[level];
			// log if needed
			if(args)
				this.log_core.log_sink(this, arguments);
			return this;
		};
		this[level] = function() {
			console.log('initiating log call on level call "%s"', level);
			var log_call = this.create_call();
			return log_call[level](arguments);
		};
	};

	LogCore.prototype.add_tag = function(tag) {
		this.tags[tag] = this.tags[tag] || {name: tag};
		this.LogCall.prototype[tag] = function(args) {
			console.log('tag "%s" direct call on log_line', tag, this);
			// save tag
			this.tags.push(this.log_core.tags[tag]);
			// log if needed
			if(args)
				this.log_core.log_sink(this, arguments);
			return this;
		};
		this[tag] = function() {
			console.log('initiating log call on tag call "%s"', tag);
			var log_call = this.create_call();
			return log_call[tag](arguments);
		};
	};

	return {
		create: function() { return new LogCore(); }
	};
});
