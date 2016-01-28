// if node.js : use amdefine (add it with npm)
if (typeof define !== 'function') { var define = require('amdefine')(module); }

define([
	'lodash'
], function(_) {
	'use strict';

	return {
		kebab: function(str) {
			return _.kebabCase(str);
		}
	};
});
