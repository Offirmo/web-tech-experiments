#!/bin/sh
':' //# https://sambal.org/?p=1014 ; exec `dirname $0`/../../node_modules/.bin/ts-node "$0" "$@"

console.log('Hello, world !')

import { Maybe } from 'tsmonad'


interface Person {
	name: string
}

interface Data {
	members: Person[]
}

interface State {
	data?: Data
}

interface Kernel {
	state?: State
}

//////////
function getFirstMemberName(state: State): string | undefined {
	return Maybe.maybe<Data>(state.data!)
	.bind(data => Maybe.maybe(data.members[0]))
	.bind(member => Maybe.just(member.name))
	.caseOf({
		just: name => name,
		nothing: () => undefined
	})

	/*
	return Maybe.maybe<Data>(state.data!)
	.bind(data => Maybe.maybe(data.members[0]))
	.caseOf({
		just: member => member.name,
		nothing: () => undefined
	})
	*/

}


//////////
const state: State = {}

console.log('1', getFirstMemberName(state))

state.data = {
	members: []
}
console.log('2', getFirstMemberName(state))

state.data.members.push({name: 'John'})
console.log('3', getFirstMemberName(state))
