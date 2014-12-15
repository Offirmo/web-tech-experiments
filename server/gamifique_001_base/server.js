#!/usr/bin/env node
'use strict';

console.log('Hello world !');

var _ = require('lodash');
var gamifique = require('../../incubator/node_and_common/gamifique')();


// first create achievements

gamifique.achievements.add({
	name: 'Newbie clicker',
	description: 'You start clicking...',
	initially_hidden: true,
	requirements: [
		{
			feat: 'click',
			needed_quantity: 10
		}
	]
});

gamifique.emit_feat('click');
