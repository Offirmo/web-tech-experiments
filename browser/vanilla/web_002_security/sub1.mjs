console.log('Hello from sub1.mjs')

const privateGlobalThis = {}

console.log('start', {globalThis})

const lnc = []

Object.keys(globalThis).forEach(k => {
	const v = globalThis[k]
	//console.log({ [k]: v })
	privateGlobalThis[k] = v

	try {
		delete globalThis[k]
	}
	catch (e) {
		lnc.push(k)
	}
})

console.log({
	globalThis,
	privateGlobalThis,
	lnc,
})
