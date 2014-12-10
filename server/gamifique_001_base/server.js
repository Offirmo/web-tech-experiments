#!/usr/bin/env node
'use strict';

var _ = require('lodash');
var gamifique = require('../../incubator/node_and_common/gamifique');


// first create achievements

gamifique.achievements.add({
	name: '1st_achievement',
	description: '1st_achievement_descr',
	initially_hidden: true,
	requirements: [
		{
			feat: '1st_achievement_manual_award',
			needed_quantity: 1,
			incremental: false
		}
	]
});

var uga = gamifique.make_new_user_account_for('user001');

