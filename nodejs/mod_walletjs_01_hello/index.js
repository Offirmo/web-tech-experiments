#!/bin/sh
':' //# http://sambal.org/?p=1014 ; exec `dirname $0`/../../node_modules/.bin/babel-node "$0" "$@"
'use strict';

console.log('Hello')


import Wallet, { Money } from 'walletjs'

const money = Money.init(100)
const wallet = Wallet.init(money)
console.log(wallet.getAmount(money.currency))

const money2 = Money.init(100)
const newWallet = wallet.add(money2)
console.log(newWallet.getAmount(money2.currency))

