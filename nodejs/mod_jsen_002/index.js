#!/usr/bin/env node
'use strict';

console.log('Hello world !')

const _ = require('lodash')

// https://github.com/bugventure/jsen
const jsen = require('jsen')

const schema = require('./weapon-component.schema.json')

const is_schema_valid = jsen({'$ref': 'https://json-schema.org/draft-04/schema#'})(schema);
if (! is_schema_valid) throw new Error('WeaponComponent model : internal schema is invalid !');

const _validate = jsen(schema, {
	greedy: true,
	formats: {}
});

const build = _validate.build;

function validate(data) {
	var err = new Error('WeaponComponent model : provided data are invalid !');
	err.bad_data = _.cloneDeep(data);
	err.validation_errors = [];

	if (!_validate(data)) {
		err.validation_errors = _.cloneDeep(_validate.errors);
		console.error('WeaponComponent model : validation error !', err.bad_data, err.validation_errors);
		throw err;
	}

	if (!_.includes([ 'base', 'qualifier1', 'qualifier2', 'quality'], data.type)) {
		err.validation_errors.push('type must be base, qualifier1, qualifier2 or quality');
		console.error('WeaponComponent model : validation error !', err.bad_data, err.validation_errors);
		throw err;
	}
}


validate({
	id: 'foo',
	i18n_key: 'foo',
	type: 'qualifier1'
})

validate({})
