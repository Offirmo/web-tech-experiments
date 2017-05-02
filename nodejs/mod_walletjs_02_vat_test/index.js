#!/bin/sh
':' //# http://sambal.org/?p=1014 ; exec `dirname $0`/../../node_modules/.bin/babel-node "$0" "$@"
'use strict';

console.log('Hello')

import Wallet, { Money } from 'walletjs'



//////// 1st the problematic case

(() => {
	const vatRate = 0.2

	const amountPaid = 3999

	let vatValuePercent = vatRate * 100
	let amountWithoutVAT = Math.round(amountPaid / (1 + vatRate))
	let amountOfVAT = amountWithoutVAT * vatRate
	let amountOfVAT2 = amountPaid - amountWithoutVAT

	console.log({vatRate, amountPaid, vatValuePercent, amountWithoutVAT, amountOfVAT, amountOfVAT2})
	console.log('rounded', {
		vatRate: Math.round(vatRate) / 100,
		amountPaid: Math.round(amountPaid) / 100,
		vatValuePercent: Math.round(vatValuePercent) / 100,
		amountWithoutVAT: Math.round(amountWithoutVAT) / 100,
		amountOfVAT: Math.round(amountOfVAT) / 100,
	})
	console.log((amountWithoutVAT + amountOfVAT) / 100)

	console.log('final', {
		vatRate: vatRate,
		amountPaid: amountPaid / 100,
		vatValuePercent: vatValuePercent,
		amountWithoutVAT: Math.round(amountWithoutVAT) / 100,
		amountOfVAT: Math.round(amountOfVAT) / 100,
	})
	console.log('rounded', Math.round( Math.round(amountWithoutVAT) + Math.round(amountOfVAT)) / 100)
})();


//////// 2 an attempted solution
console.log('\n2\n');

(() => {
	const vatRate = Money.fromString('0.2')

	const amountPaid = Money.init(3999).divideBy(100)

	let vatValuePercent = vatRate.multiplyBy(100).toString()
	let amountWithoutVAT = Money.init(amountPaid).divideBy(vatRate.add(1))
	let amountOfVAT = amountWithoutVAT.multiplyBy(vatRate)

	console.log('rounded', {
		vatRate: vatRate.toString(),
		amountPaid: amountPaid.getValue() * 100 / 100,
		vatValuePercent: vatValuePercent,
		amountWithoutVAT: amountWithoutVAT.getValue() * 100 / 100,
		amountOfVAT: amountOfVAT.getValue() * 100 / 100,
	})
})()
