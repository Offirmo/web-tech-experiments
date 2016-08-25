#!/bin/sh
':' //# http://sambal.org/?p=1014 ; exec `dirname $0`/../../node_modules/.bin/ts-node "$0" "$@"

/// <reference path="../../node_modules/inversify-dts/inversify/inversify.d.ts" />

console.log('hello')

// http://inversify.io/
import { Kernel, interfaces } from 'inversify'

interface IIntl {
	[k: string]: string
}

const kernel = new Kernel()

kernel
	.bind<IIntl>('intl')
	.toConstantValue({
		hello: 'bonjour'
	})
	.whenTargetTagged('lang', 'fr')
kernel
	.bind<IIntl>('intl')
	.toConstantValue({
		goodbye: 'au revoir'
	})
	.whenTargetTagged('lang', 'fr')
kernel
	.bind<IIntl>('intl')
	.toConstantValue({
		favorite_food: 'camembert'
	})
	.whenTargetTagged('lang', 'fr_fr')
kernel
	.bind<IIntl>('intl')
	.toConstantValue({
		favorite_food: 'poutine'
	})
	.whenTargetTagged('lang', 'fr_ca')
kernel
	.bind<IIntl>('intl')
	.toConstantValue({
		hello: 'hello'
	})
	.whenTargetTagged('lang', 'en')
kernel
	.bind<IIntl>('intl')
	.toConstantValue({
		goodbye: 'good bye'
	})
	.whenTargetTagged('lang', 'en')
kernel
	.bind<IIntl>('intl')
	.toConstantValue({
		favorite_food: 'burger'
	})
	.whenTargetTagged('lang', 'en_us')
kernel
	.bind<IIntl>('intl')
	.toConstantValue({
		favorite_food: 'jelly'
	})
	.whenTargetTagged('lang', 'en_gb')

function get_i18n(lang_id: string) {
	const [ lang, region ] = lang_id.split('_')
	let defaults: IIntl[] = []
	if (region)
		defaults = defaults.concat(kernel.getAllTagged<IIntl>('intl', 'lang', lang_id))
	defaults = defaults.concat(kernel.getAllTagged<IIntl>('intl', 'lang', 'fr'))
	return Object.assign.apply(undefined, [ {} ] .concat(defaults))
}
console.log('fr_fr', get_i18n('fr_fr'))
console.log('fr_ca', get_i18n('fr_ca'))
console.log('en_us', get_i18n('en_us'))
console.log('en_gb', get_i18n('en_gb'))
