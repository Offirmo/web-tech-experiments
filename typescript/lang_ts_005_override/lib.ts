
export function hello(locutor: string): void {
	console.log(`Hello, nice ${locutor} !`)
}

export function hello(...locutors: string[]): void {
	console.log(`Hello, nice ${locutor.join(', ')} !`)
}
