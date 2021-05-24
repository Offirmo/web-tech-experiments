



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


const Endpoint = {
	Wikidata: {
		url: 'https://www.wikidata.org/wiki/Special:EntityData/'
	},

	WDQS: {
		url: 'https://query.wikidata.org/sparql',
		limit: 50
	},

	WDQ: {
		// deprecated
		url: 'https://wdq.wmflabs.org/api/'
	},
};


module.exports = {
	Property,
	Item,
	Endpoint
};
