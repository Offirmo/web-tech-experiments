#!/usr/bin/env node
'use strict';

console.log('Hello world !');

var _ = require('lodash');
var gamifique = require('../../incubator/node_and_common/gamifique')();


// first create achievements

gamifique.achievements.add({
	name: 'Newbie clicker',
	version: '2014',
	description: 'You start clicking...',
	initially_hidden: true,
	requirements: [
		{
			feat: 'click',
			needed_quantity: 10
		}
	]
});

// optional, to give more infos
gamifique.feats.add({
	name: 'click',
	version: '2014'
});

gamifique.emit_feat('click');
