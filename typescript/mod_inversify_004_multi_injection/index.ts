#!/bin/sh
':' //# http://sambal.org/?p=1014 ; exec `dirname $0`/../../node_modules/.bin/ts-node "$0" "$@"


console.log('hello')

// http://inversify.io/
/// <reference path="../../node_modules/inversify-dts/inversify/inversify.d.ts" />
import { Kernel, interfaces } from "inversify"

interface IIntl {
	[k: string]: string
}

const kernel = new Kernel()

kernel
	.bind<IIntl>('intl.fr')
	.toConstantValue({
		hello: 'bonjour'
	})
kernel
	.bind<IIntl>('intl.fr')
	.toConstantValue({
		goodbye: 'au revoir'
	})
kernel
	.bind<IIntl>('intl.fr_fr')
	.toConstantValue({
		favorite_food: 'camembert'
	})
kernel
	.bind<IIntl>('intl.fr_ca')
	.toConstantValue({
		favorite_food: 'poutine'
	})
kernel
	.bind<IIntl>('intl.en')
	.toConstantValue({
		hello: 'hello'
	})
kernel
	.bind<IIntl>('intl.en')
	.toConstantValue({
		goodbye: 'good bye'
	})
kernel
	.bind<IIntl>('intl.en_us')
	.toConstantValue({
		favorite_food: 'burger'
	})
kernel
	.bind<IIntl>('intl.en_gb')
	.toConstantValue({
		favorite_food: 'jelly'
	})

function get_i18n(lang_id: string) {
	const [ lang, region ] = lang_id.split('_')
	let defaults: IIntl[] = []
	if (region)
		defaults = defaults.concat(kernel.getAll<IIntl>('intl.' + lang_id))
	defaults = defaults.concat(kernel.getAll<IIntl>('intl.' + lang))
	return Object.assign.apply(undefined, [ {} ] .concat(defaults))
}
console.log('fr_fr', get_i18n('fr_fr'))
console.log('fr_ca', get_i18n('fr_ca'))
console.log('en_us', get_i18n('en_us'))
console.log('en_gb', get_i18n('en_gb'))

