https://medium.com/p/e8ba34282dc1/edit

http://stackoverflow.com/questions/75980/when-are-you-supposed-to-use-escape-instead-of-encodeuri-encodeuricomponent/3608791#3608791

// http://wdq.wmflabs.org/wdq/

// CLAIM[31:6465]  P31 + Q6465 = instance_of department_of_France
// + NOT dissolved_or_abolished


// claim[PROPERTY:ITEM,...]
// claim[138:676555] returns all items that are named after (P138) Francis of Assisi (Q676555).
// claim[31:(tree[12280][][279])] gives a list of all instances (P31) of subclasses (P279) of bridges Q12280.

// noclaim[PROPERTY:ITEM,...]
// claim[138:676555] AND noclaim[31:515] returns all items that are named after (P138) Francis of Assisi (Q676555) and are not an instance of (P31) city (Q515).

// tree[ITEM,...][PROPERTY,...][PROPERTY,...]
//

// claim[106:82955] AND claim[509:12152]  List of politicians who died of a heart attack

// items[ITEM,...]  A static list of ITEMs

// CLAIM[31:6465] AND NOCLAIM[576]


//



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

