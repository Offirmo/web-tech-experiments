
export default function getOwnMetas() {
	return Array.from(document.getElementsByTagName('meta')).reduce((acc, meta) => {
		const key = meta.getAttribute('name') || meta.getAttribute('property')
		if (key)
			acc[key] = meta.getAttribute('content')
		if (key === 'viewport') {
			acc[key] = acc[key]
				.split(',')
				.map(s => s.trim(s))
				.reduce((acc, v) => {
					const [ key, value ] = v.split('=').map(s => s.trim(s))
					acc[key] = Number(value)
					return acc
				}, {})
		}
		//console.log(val)
		return acc
	}, {})
}
