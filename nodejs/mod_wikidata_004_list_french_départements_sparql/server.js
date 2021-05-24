#!/usr/bin/env node --harmony_destructuring
'use strict';

console.log('Hello world !');

////////////////////////////////////////////////////////////

// https://github.com/maxlath/wikidata-sdk
const wdk = require('wikidata-sdk');

const fetch = require('node-fetch');

const _ = require('lodash');

// https://fr.wikipedia.org/wiki/Liste_des_d%C3%A9partements_fran%C3%A7ais

// Good département : https://www.wikidata.org/wiki/Q12584
// Bad département :
// https://www.wikidata.org/wiki/Wikidata:List_of_properties/Geographical_feature#Administrative_territorial_entity

////////////////////////////////////////////////////////////

const WDQS_endpoint = 'https://query.wikidata.org/sparql';
const Wikidata_endpoint = 'https://www.wikidata.org/wiki/Special:EntityData/';

let query = `prefix wdt: <https://www.wikidata.org/prop/direct/>
prefix wd: <https://www.wikidata.org/entity/>
SELECT ?item WHERE {
  ?item wdt:P31 wd:Q6465 .
  OPTIONAL { ?item wdt:P576 ?dummy0 }
  FILTER(!bound(?dummy0))
}`;

let url = wdk.sparqlQuery(query);

console.log('* query : ' + query);
console.log('* query URL : ' + url);

console.log('* fetching…');

fetch(url)
.then(res  => res.json())
.then((data) => {
	// https://www.w3.org/TR/sparql11-results-json/

	console.log(data);
	let {head, results} = data;

	console.log('* bindings ', results.bindings, results.bindings.length);
})
.catch((err) => {
	console.error('ERR', err);
});
