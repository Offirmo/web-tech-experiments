
function prettify_obj(obj) {
	return JSON.stringify(obj)
}

function learn(warrior, knowledge) {
	if (!knowledge)
		return {
			MAX_HEALTH: warrior.health(),
			REST_HEALTH_INCREMENT: 2, // or 10%?
		}

	const MAX_HEALTH = Math.max(knowledge.MAX_HEALTH, warrior.health())

	return {
		...knowledge,
		MAX_HEALTH,
		REST_HEALTH_INCREMENT: MAX_HEALTH * 10 / 100,
	}
}

function identify_sensed(SENSED) {
	if (SENSED.isEmpty())
		return 'nothing'

	if (SENSED.isWall())
		return 'wall'

	const SENSED_UNIT = SENSED.getUnit()
	if (!SENSED_UNIT)
		return '?'

	if (SENSED_UNIT.isEnemy())
		return 'enemy'
	else if (SENSED_UNIT.isBound())
		return 'captive'

	return 'undefined unit'
}

const DIRECTIONS = [
	'backward',
	'forward',
]

const DIRECTION_OPPOSITE = {
	'backward': 'forward',
	'forward': 'backward',
}

function get_status(warrior, knowledge, last_status) {
	if (!last_status) {
		last_status = {
			state: {
				health: warrior.health(),
			},
			situation: {
				taking_damage: false,
			},
			memory: {
				turn_count: 0,
				my_direction: 'forward',
			},
		}
	}

	const status = {
		attributes: {
			max_health: knowledge.MAX_HEALTH,
		},
		state: {
			health: warrior.health(),
		},
		situation: {
			backward: {
				sensing: false,
				sensed: null,
			},
			forward: {
				sensing: false,
				sensed: null,
			},
			taking_damage: last_status.state.health > warrior.health(),
		},
		memory: {
			...last_status.memory,
			turn_count: last_status.memory.turn_count + 1,
		},
	}

	DIRECTIONS.forEach(direction => {
		const SENSED = warrior.feel(direction)
		status.situation[direction] = status.situation[direction] || {}
		status.situation[direction].sensing = !SENSED.isEmpty()
		status.situation[direction].sensed = identify_sensed(SENSED)
	})

	return status
}

let knowledge
let last_status

class Player {
	playTurn(warrior) {
		knowledge = learn(warrior, knowledge)
		warrior.think(prettify_obj({knowledge}))

		warrior.think(prettify_obj({last_status}))

		const status = get_status(warrior, knowledge, last_status)
		warrior.think(prettify_obj({status}))

		// coolness
		if (status.memory.turn_count === 1) {
			warrior.think(`Ha ha, a new level! For glory and loot!!!`)
		}

		let my_direction = status.memory.my_direction || 'forward'
		let decided = undefined

		// Highest priority: close-range ennemies
		if (!decided && status.situation[my_direction].sensed === 'enemy') {
			warrior.think(`Take that filthy monster!! [${my_direction}]`)
			warrior.attack(my_direction)
			decided = `warrior.attack('${my_direction}')`
		}
		DIRECTIONS.forEach(direction => {
			if (decided) return

			if (status.situation[direction].sensed === 'enemy') {
				if (direction !== my_direction) {
					warrior.think(`Ah! An ennemy behind me!! [${direction}]`)
					warrior.pivot(direction)
					my_direction = direction
					decided = `warrior.pivot('${direction}')`
				}
				else {
					warrior.think(`Take that filthy monster!! [${direction}]`)
					warrior.attack(direction)
					decided = `warrior.attack('${direction}')`
				}
			}
		})

		// second highest priority: long-range ennemies
		if (!decided && status.situation.taking_damage) {
			if (status.state.health < knowledge.MAX_HEALTH / 2) {
				warrior.think(`You sneaky archer! I'll retreat for now`)
				const dir = DIRECTION_OPPOSITE[my_direction]
				warrior.walk(dir)
				decided = `warrior.walk('${dir}')`
			}
			else {
				warrior.think(`You sneaky archer! Coming for you!!`)
				warrior.walk(my_direction)
				decided = `warrior.walk('${my_direction}')`
			}
		}

		// then survival
		if (!decided && status.state.health <= (knowledge.MAX_HEALTH - knowledge.REST_HEALTH_INCREMENT)) {
			warrior.think(`Seems safe, let's rest.`)
			warrior.rest()
			decided = `warrior.rest()`
		}

		// captives
		DIRECTIONS.forEach(direction => {
			if (decided) return

			if (status.situation[direction].sensed === 'captive') {
				warrior.think(`You are safe! [${direction}]`)
				warrior.rescue(direction)
				decided = `warrior.rescue('${direction}')`
			}
		})

		// exploration
		if (!decided) {
			warrior.think(`On we go!!`)

			if (status.situation[my_direction].sensed === 'wall') {
				warrior.think(`Dead end... [${my_direction}]`)
				my_direction = DIRECTION_OPPOSITE[my_direction]
				warrior.pivot(my_direction)
				decided = `warrior.pivot('${my_direction}')`
			}
			else {
				warrior.walk()
				decided = `warrior.walk() [${my_direction}]`
			}
		}

		warrior.think(`decided: ${decided}`)

		status.memory.my_direction = my_direction
		last_status = status
	}
}
