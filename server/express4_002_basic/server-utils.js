'use strict';

var _ = require('lodash');

module.exports = {

	// Get local IPs for display at start, ease debug with my VM
	// http://stackoverflow.com/questions/3653065/get-local-ip-address-in-node-js
	// http://nodejs.org/api/os.html#os_os_networkinterfaces
	get_local_ips: function() {
		return _.chain(require('os').networkInterfaces())
		.values()
		.flatten()
		.filter(function(val){
			return (val.family === 'IPv4' && val.internal === false);
		})
		.pluck('address')
		.value();
	}
};
