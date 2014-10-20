// if node.js : use amdefine (add it with npm)
//if (typeof define !== 'function') { var define = require('amdefine')(module); }

define([
	'lodash'
],function(_) {
	'use strict';


	function clone_array_for_msg_passing(array, parent_context) {
		var clone = [];
		var context = {
			rank: parent_context.rank + 1,
			encountered_objects: [],
			debug: parent_context.debug
		};

		if(context.debug) console.group(parent_context.rank, 'cloning "' + parent_context.key + '" as an array...')

		_.forEach(array, function(value, index) {
			context.key = index;
			clone[index] = clone_unknown_for_msg_passing(value, context);
		});

		if(context.debug) console.groupEnd();

		return clone;
	}

	function clone_object_for_msg_passing(object, parent_context) {
		var clone = {};
		var context = {
			rank: parent_context.rank + 1,
			encountered_objects: [],
			debug: parent_context.debug
		};

		if(context.debug) console.group(parent_context.rank, 'cloning "' + parent_context.key + '" as an object...')

		_.forIn(object, function(value, key) {
			if(! _.isFunction(value)) { // skip functions, they don't pass across worker msgs
				context.key = key;
				clone[key] = clone_unknown_for_msg_passing(value, context);
			}
		});

		if(context.debug) console.groupEnd();

		return clone;
	}

	function clone_unknown_for_msg_passing(value, context) {
		if(_.isFunction(value)) return '(suppressed function)'; // skip functions, they don't pass across worker msgs
		if(_.isArray(value))
			return clone_array_for_msg_passing(value, context);
		if(value instanceof String) {
			if(context.debug) console.group(context.rank, 'cloning ' + context.key + ' as a String object...')
			if(context.debug) console.groupEnd();
			return value.toString();
		}
		if(value instanceof Number) {
			if(context.debug) console.group(context.rank, 'cloning ' + context.key + ' as a Number object...')
			if(context.debug) console.groupEnd();
			return value.valueOf();
		}
		if(_.isObject(value))
			return clone_object_for_msg_passing(value, context);
		if(context.debug) console.group(context.rank, 'cloning ' + context.key + ' as a base...')
		if(context.debug) console.groupEnd();
		return _.clone(value);
	}


	function clone_for_msg_passing(value, context) {
		context = context || {};
		context.key = context.key || '(start)';
		context.rank = context.rank || 1;
		context.encountered_objects = context.encountered_objects || [];
		context.debug = _.isBoolean(context.debug) ? context.debug : false;

		return clone_unknown_for_msg_passing(value, context);
	}

	return {
		clone_for_msg_passing: clone_for_msg_passing,
	};

}); // requirejs module
