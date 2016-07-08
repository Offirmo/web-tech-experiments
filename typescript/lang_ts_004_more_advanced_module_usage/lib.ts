
import _ = require('lodash')

export default function hello(locutor: string): void {
	console.log(`Hello, nice ${_.toUpper(locutor)} !`)
}
