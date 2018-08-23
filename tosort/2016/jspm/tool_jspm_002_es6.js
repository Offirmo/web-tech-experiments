import _ from 'lodash';

console.log('hello, Javascript world !', _.VERSION);

_.forEach(['hello', 'world'], function(msg) {
	console.log(msg);
});
