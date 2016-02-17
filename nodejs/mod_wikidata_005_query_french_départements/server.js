#!/bin/sh
':' //# http://sambal.org/?p=1014 ; exec /usr/bin/env node --harmony_destructuring "$0" "$@"
'use strict';

console.log('Hello world !');

////////////////////////////////////////////////////////////

const _ = require('lodash');
const async = require('async');
const fetch = require('node-fetch');

// https://github.com/maxlath/wikidata-sdk
const wdk = require('wikidata-sdk');

const Wikidata = require('../mod_wikidata_common');

////////////////////////////////////////////////////////////

let query = `prefix wdt: <http://www.wikidata.org/prop/direct/>
prefix wd: <http://www.wikidata.org/entity/>
SELECT ?item WHERE {
  ?item wdt:P31 wd:Q6465 .
  OPTIONAL { ?item wdt:P576 ?dummy0 }
  FILTER(!bound(?dummy0))
}`;

// http://stackoverflow.com/a/3608791/587407
//let url = Wikidata.Endpoint.WDQS + '?format=json&query=' + encodeURIComponent(query);
let url = wdk.sparqlQuery(query);

console.log('* query : ' + query);
console.log('* query URL : ' + url);

console.log('* fetching…');

/*
fetch(url)
.then(res  => res.json())
.then((data) => {
	// https://www.w3.org/TR/sparql11-results-json/

	console.log(data);
	let {head, results} = data;

	console.log('* bindings ', results.bindings, results.bindings.length);
	return results.bindings;
})
*/
Promise.resolve([ { item: { type: 'uri', value: 'http://www.wikidata.org/entity/Q3068' } },
 { item: { type: 'uri', value: 'http://www.wikidata.org/entity/Q3083' } },
 { item: { type: 'uri', value: 'http://www.wikidata.org/entity/Q3093' } },
 { item: { type: 'uri', value: 'http://www.wikidata.org/entity/Q3105' } },
 { item: { type: 'uri', value: 'http://www.wikidata.org/entity/Q3113' } },
 { item: { type: 'uri', value: 'http://www.wikidata.org/entity/Q3120' } },
 { item: { type: 'uri', value: 'http://www.wikidata.org/entity/Q3125' } },
 { item: { type: 'uri', value: 'http://www.wikidata.org/entity/Q3131' } },
 { item: { type: 'uri', value: 'http://www.wikidata.org/entity/Q3139' } },
 { item: { type: 'uri', value: 'http://www.wikidata.org/entity/Q3148' } },
 { item: { type: 'uri', value: 'http://www.wikidata.org/entity/Q3164' } },
 { item: { type: 'uri', value: 'http://www.wikidata.org/entity/Q3184' } },
 { item: { type: 'uri', value: 'http://www.wikidata.org/entity/Q3194' } },
 { item: { type: 'uri', value: 'http://www.wikidata.org/entity/Q3207' } },
 { item: { type: 'uri', value: 'http://www.wikidata.org/entity/Q3216' } },
 { item: { type: 'uri', value: 'http://www.wikidata.org/entity/Q3240' } },
 { item: { type: 'uri', value: 'http://www.wikidata.org/entity/Q3249' } },
 { item: { type: 'uri', value: 'http://www.wikidata.org/entity/Q3259' } },
 { item: { type: 'uri', value: 'http://www.wikidata.org/entity/Q3266' } },
 { item: { type: 'uri', value: 'http://www.wikidata.org/entity/Q3278' } },
 { item: { type: 'uri', value: 'http://www.wikidata.org/entity/Q3286' } },
 { item: { type: 'uri', value: 'http://www.wikidata.org/entity/Q3326' } },
 { item: { type: 'uri', value: 'http://www.wikidata.org/entity/Q3334' } },
 { item: { type: 'uri', value: 'http://www.wikidata.org/entity/Q3336' } },
 { item: { type: 'uri', value: 'http://www.wikidata.org/entity/Q3342' } },
 { item: { type: 'uri', value: 'http://www.wikidata.org/entity/Q3349' } },
 { item: { type: 'uri', value: 'http://www.wikidata.org/entity/Q3353' } },
 { item: { type: 'uri', value: 'http://www.wikidata.org/entity/Q3357' } },
 { item: { type: 'uri', value: 'http://www.wikidata.org/entity/Q3361' } },
 { item: { type: 'uri', value: 'http://www.wikidata.org/entity/Q3364' } },
 { item: { type: 'uri', value: 'http://www.wikidata.org/entity/Q3368' } },
 { item: { type: 'uri', value: 'http://www.wikidata.org/entity/Q3372' } },
 { item: { type: 'uri', value: 'http://www.wikidata.org/entity/Q3377' } },
 { item: { type: 'uri', value: 'http://www.wikidata.org/entity/Q3389' } },
 { item: { type: 'uri', value: 'http://www.wikidata.org/entity/Q12515' } },
 { item: { type: 'uri', value: 'http://www.wikidata.org/entity/Q12517' } },
 { item: { type: 'uri', value: 'http://www.wikidata.org/entity/Q12526' } },
 { item: { type: 'uri', value: 'http://www.wikidata.org/entity/Q12538' } },
 { item: { type: 'uri', value: 'http://www.wikidata.org/entity/Q12543' } },
 { item: { type: 'uri', value: 'http://www.wikidata.org/entity/Q12545' } },
 { item: { type: 'uri', value: 'http://www.wikidata.org/entity/Q12549' } },
 { item: { type: 'uri', value: 'http://www.wikidata.org/entity/Q12553' } },
 { item: { type: 'uri', value: 'http://www.wikidata.org/entity/Q12556' } },
 { item: { type: 'uri', value: 'http://www.wikidata.org/entity/Q12559' } },
 { item: { type: 'uri', value: 'http://www.wikidata.org/entity/Q12563' } },
 { item: { type: 'uri', value: 'http://www.wikidata.org/entity/Q12564' } },
 { item: { type: 'uri', value: 'http://www.wikidata.org/entity/Q12569' } },
 { item: { type: 'uri', value: 'http://www.wikidata.org/entity/Q12572' } },
 { item: { type: 'uri', value: 'http://www.wikidata.org/entity/Q12574' } },
 { item: { type: 'uri', value: 'http://www.wikidata.org/entity/Q12576' } },
 { item: { type: 'uri', value: 'http://www.wikidata.org/entity/Q12578' } },
 { item: { type: 'uri', value: 'http://www.wikidata.org/entity/Q12580' } },
 { item: { type: 'uri', value: 'http://www.wikidata.org/entity/Q12584' } },
 { item: { type: 'uri', value: 'http://www.wikidata.org/entity/Q12589' } },
 { item: { type: 'uri', value: 'http://www.wikidata.org/entity/Q12594' } },
 { item: { type: 'uri', value: 'http://www.wikidata.org/entity/Q12607' } },
 { item: { type: 'uri', value: 'http://www.wikidata.org/entity/Q12620' } },
 { item: { type: 'uri', value: 'http://www.wikidata.org/entity/Q12626' } },
 { item: { type: 'uri', value: 'http://www.wikidata.org/entity/Q12631' } },
 { item: { type: 'uri', value: 'http://www.wikidata.org/entity/Q12642' } },
 { item: { type: 'uri', value: 'http://www.wikidata.org/entity/Q12652' } },
 { item: { type: 'uri', value: 'http://www.wikidata.org/entity/Q12657' } },
 { item: { type: 'uri', value: 'http://www.wikidata.org/entity/Q12661' } },
 { item: { type: 'uri', value: 'http://www.wikidata.org/entity/Q12675' } },
 { item: { type: 'uri', value: 'http://www.wikidata.org/entity/Q12679' } },
 { item: { type: 'uri', value: 'http://www.wikidata.org/entity/Q12689' } },
 { item: { type: 'uri', value: 'http://www.wikidata.org/entity/Q12694' } },
 { item: { type: 'uri', value: 'http://www.wikidata.org/entity/Q12700' } },
 { item: { type: 'uri', value: 'http://www.wikidata.org/entity/Q12703' } },
 { item: { type: 'uri', value: 'http://www.wikidata.org/entity/Q12709' } },
 { item: { type: 'uri', value: 'http://www.wikidata.org/entity/Q12717' } },
 { item: { type: 'uri', value: 'http://www.wikidata.org/entity/Q12722' } },
 { item: { type: 'uri', value: 'http://www.wikidata.org/entity/Q12730' } },
 { item: { type: 'uri', value: 'http://www.wikidata.org/entity/Q12736' } },
 { item: { type: 'uri', value: 'http://www.wikidata.org/entity/Q12740' } },
 { item: { type: 'uri', value: 'http://www.wikidata.org/entity/Q12745' } },
 { item: { type: 'uri', value: 'http://www.wikidata.org/entity/Q12751' } },
 { item: { type: 'uri', value: 'http://www.wikidata.org/entity/Q12753' } },
 { item: { type: 'uri', value: 'http://www.wikidata.org/entity/Q12758' } },
 { item: { type: 'uri', value: 'http://www.wikidata.org/entity/Q12761' } },
 { item: { type: 'uri', value: 'http://www.wikidata.org/entity/Q12765' } },
 { item: { type: 'uri', value: 'http://www.wikidata.org/entity/Q12770' } },
 { item: { type: 'uri', value: 'http://www.wikidata.org/entity/Q12772' } },
 { item: { type: 'uri', value: 'http://www.wikidata.org/entity/Q12779' } },
 { item: { type: 'uri', value: 'http://www.wikidata.org/entity/Q12782' } },
 { item: { type: 'uri', value: 'http://www.wikidata.org/entity/Q12784' } },
 { item: { type: 'uri', value: 'http://www.wikidata.org/entity/Q12788' } },
 { item: { type: 'uri', value: 'http://www.wikidata.org/entity/Q12789' } },
 { item: { type: 'uri', value: 'http://www.wikidata.org/entity/Q12792' } },
 { item: { type: 'uri', value: 'http://www.wikidata.org/entity/Q12798' } },
 { item: { type: 'uri', value: 'http://www.wikidata.org/entity/Q12804' } },
 { item: { type: 'uri', value: 'http://www.wikidata.org/entity/Q12808' } },
 { item: { type: 'uri', value: 'http://www.wikidata.org/entity/Q12816' } },
 { item: { type: 'uri', value: 'http://www.wikidata.org/entity/Q12820' } },
 { item: { type: 'uri', value: 'http://www.wikidata.org/entity/Q46130' } } ])
.then((bindings) => {

	var entity_ids = _(bindings)
		.map('item.value')
		.map(uri => uri.slice(uri.lastIndexOf('/') + 1))
		.value();

	//console.log(entity_ids);

	return fetchEntities({
		ids: entity_ids,
		languages: ['fr']
	});
})
.then(function(data) {
	//console.log('final data', data);
	var entities = data.entities;
	//console.log(entities);
	function comparator(entity) {
		const P300_claim = entity.claims.P300;
		//console.log(P300_claim);
		if (P300_claim) {
			if(P300_claim.length != 1)
				console.log('strange', P300_claim);
			return P300_claim[0].mainsnak.datavalue.value;
		}

		const label = entity.labels.fr.value;
		console.log('entity "' + label + '" has no code !');
		return label;
	}
	var entity_keys = _.keys(entities).sort((a, b) => {
		const entity_a = entities[a];
		const entity_b = entities[b];

		//console.log('' + entity_a_label + ' > ' + entity_b_label);
		return comparator(entity_a).localeCompare(comparator(entity_b));
	});
	console.log(entity_keys);

	console.log(entities[entity_keys[0]]);

	entity_keys.forEach((key, i) => {
		const entity = entities[key];
		const {id, labels} = entity;
		console.log('* ' + key + ' : ' + comparator(entity) + ' - ' + labels.fr.value);
	});

})
.catch((err) => {
	console.error('ERR', err);
});


function fetchEntities(params) {
	let entity_ids = _.flatten([params.ids]);
	params.ids = undefined; // for later merge
	let id_batches = [];

	while (entity_ids.length > 0)
		id_batches.push(entity_ids.splice(0, Wikidata.Endpoint.WDQS.limit));

	/*id_batches.forEach((batch, index) => {
		console.log('* batch #' + index + ' : [size ' + batch.length + '] ', batch);
	});*/
	//console.log(id_batches.length, id_batches[0].length, id_batches);

	let urls = id_batches.map((ids, i) => {
		let xparams = _.merge({}, params, {ids});
		//console.log('* batch #' + i + ' params :', xparams);
		return wdk.getEntities(xparams);
	});
	console.log(urls);

	let promises = urls.map((url) => {
		return fetch(url)
		.then(res => res.json())
		.then((data) => {
			let {errors, warnings, success, entities} = data;
			if (errors) console.error('errors', errors);
			if (warnings) console.warn('warnings', warnings);
			return data;
		});
	});

	return Promise.all(promises)
	.then((values) => {
		console.log(values);
		return values.reduce((finalResult, currentResult) => {
			return _.merge(finalResult, currentResult);
		}, {})
	});
}
