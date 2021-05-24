#!/usr/bin/env node --harmony_destructuring
'use strict';

console.log('Hello world !');

////////////////////////////////////////////////////////////

// https://github.com/maxlath/wikidata-sdk
const wdk = require('wikidata-sdk');

const fetch = require('node-fetch');

// https://fr.wikipedia.org/wiki/Liste_des_d%C3%A9partements_fran%C3%A7ais

// Good département : https://www.wikidata.org/wiki/Q12584
// Bad département :
// https://www.wikidata.org/wiki/Wikidata:List_of_properties/Geographical_feature#Administrative_territorial_entity

////////////////////////////////////////////////////////////

const WDQ_endpoint = 'https://wdq.wmflabs.org/api/';
const Wikidata_endpoint = 'https://www.wikidata.org/wiki/Special:EntityData/';

let query = 'CLAIM[31:6465] AND NOCLAIM[576]';

// https://stackoverflow.com/a/3608791/587407
let url = WDQ_endpoint + '?q=' + encodeURIComponent(query);

console.log('* query : ' + query);
console.log('* query URL : ' + url);

console.log('* fetching…');
fetch(url)
.then(res  => res.json())
.then((data) => {
	let {status, items} = data;
	if(status.error) throw new Error(status.error);

	console.log('* status ', status);
	console.log(items);
})
.catch((err) => {
	console.error('ERR', err);
});
