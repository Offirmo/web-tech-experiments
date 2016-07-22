#!/bin/sh
':' //# http://sambal.org/?p=1014 ; exec `dirname $0`/../../node_modules/.bin/ts-node "$0" "$@"

// https://visualstudiomagazine.com/articles/2015/11/01/overloading-typescript-functions.aspx

function hello(locutor: string, ...locutors: string[]): void {
	locutors.unshift(locutor)
	console.log(`Hello, nice ${locutors.join(', ')} !`)
}


hello('typescript world')

hello('Joe', 'Jack', 'William', 'Averell')
