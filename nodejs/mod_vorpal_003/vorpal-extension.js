// https://github.com/dthree/vorpal/wiki/Docs-|-Creating-Extensions
// https://github.com/dthree/vorpal

module.exports = function(vorpal, options) {

	vorpal
		.command('foo', 'Outputs "bar".')
		.action(function(args, callback) {
			this.log('bar');
			callback();
		});

	// ... more commands!

};
