#!/usr/bin/env node
'use strict';

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

//var uga = gamifique.make_new_user_account_for('user001');

