

function prettify_obj(obj) {
	return JSON.stringify(obj)
}


function learn(warrior, knowledge) {
	if (!knowledge)
		return {
			MAX_HEALTH: warrior.health(),
		}

	return {
		...knowledge,
		MAX_HEALTH: Math.max(knowledge.MAX_HEALTH, warrior.health()),
	}
}


function get_status(warrior, knowledge, last_status) {
	if (!last_status) {
		last_status = {
			attributes: {
				max_health: warrior.health(),
			},
			state: {
				health: warrior.health(),
			},
			situation: {
				feeling: false,
				taking_damage: false,
			},
			memory: {
				turn_count: 0,
			},
		}
	}

	const result = {
		attributes: {
			max_health: knowledge.MAX_HEALTH,
		},
		state: {
			health: warrior.health(),
		},
		situation: {
			feeling: !warrior.feel().isEmpty(),
			taking_damage: last_status.state.health > warrior.health(),
		},
		memory: {
			turn_count: last_status.memory.turn_count + 1,
		},
	}

	return result
}

let knowledge
let last_status

class Player {
	playTurn(warrior) {
		//warrior.think('~~~~~ playTurn ~~~~~')
		//warrior.think(prettify_obj({warrior}))
		//warrior.think(prettify_obj({'warrior.feel': warrior.feel()}))

		knowledge = learn(warrior, knowledge)
		warrior.think(prettify_obj({knowledge}))

		warrior.think(prettify_obj({last_status}))

		const status = get_status(warrior, knowledge, last_status)
		warrior.think(prettify_obj({status}))

		// coolness
		if (status.memory.turn_count === 1) {
			warrior.think(`Ha ha, a new level! For glory and loot!!!`)
		}

		warrior.think(`My health is ${warrior.health()}/${knowledge.MAX_HEALTH}`)

		if (status.situation.feeling) {
			warrior.think(`Take that filthy monster!!`)
			warrior.attack()
		}
		else if (status.situation.taking_damage) {
			warrior.think(`You sneaky archer! Coming for you!!`)
			warrior.walk()
		}
		else if (warrior.health() < knowledge.MAX_HEALTH) {
			warrior.think(`Seems safe, let's rest.`)
			warrior.rest()
		}
		else {
			warrior.think(`On we go!!`)
			warrior.walk()
		}

		last_status = status
	}
}
