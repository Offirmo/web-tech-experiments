// no amdefine header

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
