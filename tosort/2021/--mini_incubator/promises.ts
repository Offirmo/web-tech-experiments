
// variant of Promise.race which'll reject only when all have failed
function race_for_success(p1: Promise<T>, p2: Promise<T>): Promise<T> {
	return new Promise<T>((resolve, reject) => {
		// resolve with 1st
		p1.then(resolve)
		p2.then(resolve)
		// reject with last
		p1.catch(() => p2.catch(reject))
		p2.catch(() => p1.catch(reject))
	})
}

// a simple log function
function log(p: Promise<T>, target: string): Promise<T> {
	p.then(
		() => console.log('* ' + target + ' ✓'),
		(err) => console.error('! ' + target + ' ❌\n\n!!!!!!!!\n', err)
	)

	return p
}

function reject_if_not_resolved_by_this_ms(p: Promise<T>, delay_ms: number = 1000) {
	return new Promise<T>((resolve, reject) => {
		// 1st resolve / reject will win !
		p.then(resolve, reject)
		setTimeout(() => reject(new Error(`Timeout (${delay_ms}ms)`)), delay_ms)
	})
}

/*
function make_deferred<T>(): {
	resolve:
} {
	const res_fn = {}

	const p = new Promise((resolve, reject) => {
		res_fn.resolve = resolve
		res_fn.reject = reject
	})

	p.resolve = res_fn.resolve
	p.reject = res_fn.reject

	return p
}

	*/
