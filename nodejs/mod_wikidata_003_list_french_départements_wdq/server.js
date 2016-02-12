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

const Property = {

	// 3 "basic membership properties"
	// https://www.wikidata.org/wiki/Help:Basic_membership_properties
	// all transitives
	instance_of:  'P31', // https://www.wikidata.org/wiki/Property:P31
	subclass_of: 'P279', // https://www.wikidata.org/wiki/Property:P279
	part_of: 'P361', // https://www.wikidata.org/wiki/Property:P361


	dissolved_or_abolished: 'P576', // https://www.wikidata.org/wiki/Property:P576
	subproperty_of: 'P1647',

};

const Item = {
	department_of_France: 'Q6465', // https://www.wikidata.org/wiki/Q6465
	first_level_administrative_country_subdivision: 'Q10864048', // https://www.wikidata.org/wiki/Q10864048
};

const WDQ_endpoint = 'https://wdq.wmflabs.org/api/';
const Wikidata_endpoint = 'http://www.wikidata.org/wiki/Special:EntityData/';

let query = 'CLAIM[31:6465] AND NOCLAIM[576]';

// http://stackoverflow.com/a/3608791/587407
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
