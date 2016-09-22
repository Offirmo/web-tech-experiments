#!/bin/sh
':' //# http://sambal.org/?p=1014 ; exec `dirname $0`/../../node_modules/.bin/babel-node "$0" "$@"
'use strict';

console.log('Hello world !');

// http://www.js-data.io/docs/home
import JSData from 'js-data'

////////////


let store = new JSData.DS()

////////////

// http://www.js-data.io/docs/dsdefineresource
const Item = store.defineResource('item')

const item01 =
//const item01 = Item.createInstance({ type: 'weapon' })
//const item01 = Item.inject({ id: 1 })
//console.log(item01)

Item.create({ type: 'weapon' }).then(item => console.log)

////////////
/*
const ItemQuality = store.defineResource({
	name: 'item_quality',
	relations: {}
})

*/
