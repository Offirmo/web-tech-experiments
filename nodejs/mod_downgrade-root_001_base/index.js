const isRoot = require('is-root')
const downgradeRoot = require('downgrade-root');

console.log(`You are ${isRoot() ? 'root' : 'not root'}.`)

if (isRoot()) {
	try {
		downgradeRoot()
		console.log('root privileges relinquished.')
	} catch (err) {
		console.error('Couldn’t downgrade permissions !')
		process.exit(1)
	}
}
