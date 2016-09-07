const isRoot = require('is-root')

if (isRoot()) {
	console.log(`You are root!`)
	try {
		require('downgrade-root')()
		console.log('root privileges relinquished.')
	} catch (err) {
		console.error('Couldn’t downgrade permissions !')
		require('sudo-block')()
	}
}
