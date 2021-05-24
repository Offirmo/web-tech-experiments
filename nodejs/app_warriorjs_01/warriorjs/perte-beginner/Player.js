
/*
function prettify_obj(obj) {
	return JSON.stringify(obj)
}*/

// https://stackoverflow.com/questions/9781218/how-to-change-node-jss-console-font-color
const ANSI_RESET = '\x1b[0m'
const ANSI_FG_RED = '\x1b[31m'
function prettify_obj(x) {
	if (x === null)
		return 'null'

	if (Array.isArray(x))
		return [
			'[',
			x.map(prettify_obj).join(','),
			']',
		].join('')

	// https://devdocs.io/javascript/operators/typeof
	switch(typeof x) {
		case 'string':
			return `'${x}'`
		case 'object':
			return [
				'{',
				Object.keys(x).sort().map(k => `${k}:${prettify_obj(x[k])}`).join(','),
				'}',
			].join('')
		default:
			return ANSI_FG_RED + x + ANSI_RESET
	}
}

function learn(warrior, knowledge) {
	if (!knowledge)
		knowledge = {
			MAX_HEALTH: warrior.health(),
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
		return null

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

const RELATIVE_DIRECTIONS = [
	'forward', // Optim: forward must ALWAYS be firste
	'backward',
]

const ABSOLUTE_DIRECTIONS = [
	'up',
	'right',
	'down',
	'left',
]

const ABSOLUTE_DIRECTION_OPPOSITE = {
	'up': 'down',
	'down': 'up',
	'right': 'left',
	'left': 'right',
}

function get_status(warrior, knowledge, last_status) {
	if (!last_status) {
		last_status = {
			turn_count: 0,
			my_absolute_direction: 'right',
			health: warrior.health(),
			surroundings: {
				taking_damage: false,
			},
		}
	}

	const status = {
		...last_status,
		turn_count: last_status.memory.turn_count + 1,
		health: warrior.health(),
		surroundings: {
			backward: {
				sensing: false,
				seeing: false,
			},
			forward: {
				sensing: false,
				seeing: false,
			},
			taking_damage: last_status.health > warrior.health(),
		},
	}

	RELATIVE_DIRECTIONS.forEach(relative_direction => {
		const SENSED = warrior.feel(relative_direction)
		status.surroundings[relative_direction] = status.surroundings[relative_direction] || {}
		status.surroundings[relative_direction].sensing = !SENSED.isEmpty()
		status.surroundings[relative_direction].sensed = identify_sensed(SENSED)

		const SEEN = warrior.look(relative_direction)
			.slice(1) // ignore 1st which we "sensed" already
			.map(identify_sensed)

		SEEN.forEach((seen, index) => {
			if (!seen) return
			if (status.surroundings[relative_direction].sensing) return
			if (status.surroundings[relative_direction].seeing) return

			status.surroundings[relative_direction].seeing = true
			status.surroundings[relative_direction].seen = seen
			status.surroundings[relative_direction].seen_distance = index + 1
		})
	})

	return status
}

function get_new_absolute_direction_after_pivot_to(relative_direction, previous_absolute_direction) {
	switch(relative_direction) {
		case 'forward':
			throw new Error('Inefficiency! pivoted forward!')
		case 'backward':
			return ABSOLUTE_DIRECTION_OPPOSITE[previous_absolute_direction]
		default:
			throw new Error(`Unknown relative direction "${relative_direction}"!`)
	}
}


let knowledge
let last_status

const RADIX = '⋅' + ANSI_RESET

class Player {
	playTurn(warrior) {
		knowledge = learn(warrior, knowledge)
		warrior.think(RADIX + 'K  :' + prettify_obj(knowledge))

		warrior.think(RADIX + 'N-1:' + prettify_obj(last_status))

		const status = get_status(warrior, knowledge, last_status)
		warrior.think(RADIX + 'N  :' + prettify_obj(status))

		// coolness
		if (status.turn_count === 1) {
			warrior.think(RADIX + `Ha ha, a new level! For glory and loot!!!`)
		}

		let { my_absolute_direction } = status
		let decided = undefined

		// Highest priority: close-range enemies
		// forward being the most effective
		// forward is the 1st evaluated
		RELATIVE_DIRECTIONS.forEach(relative_direction => {
			if (decided) return

			if (status.surroundings[relative_direction].sensed === 'enemy') {
				if (relative_direction === 'forward') {
					warrior.think(RADIX + `Take that filthy monster!! [${relative_direction}]`)
					warrior.attack()
					decided = `warrior.attack()`
				}
				else {
					// pivot to be more effective. TODO check the rules about that!
					warrior.think(RADIX + `Ah! An ennemy behind me!! [${relative_direction}]`)
					warrior.pivot(relative_direction)
					my_absolute_direction = get_new_absolute_direction_after_pivot_to(relative_direction, my_absolute_direction)
					decided = `warrior.pivot('${relative_direction}')`
				}
			}
		})

		// second highest priority: long-range enemies
		// forward is the 1st evaluated
		RELATIVE_DIRECTIONS.forEach(relative_direction => {
			if (decided) return

			if (status.surroundings[relative_direction].seen === 'enemy') {
				warrior.think(RADIX + `Take that filthy distant monster!! [${relative_direction}]`)
				warrior.shoot(relative_direction)
				decided = `warrior.shoot('${relative_direction})`
			}
		})
		/*if (!decided && status.surroundings.taking_damage) {
			if (status.health < knowledge.MAX_HEALTH / 2) {
				warrior.think(`You sneaky archer! I'll retreat for now`)
				const dir = DIRECTION_OPPOSITE[my_absolute_direction]
				warrior.walk(dir)
				decided = `warrior.walk('${dir}')`
			}
			else {
				warrior.think(`You sneaky archer! Coming for you!!`)
				warrior.walk(my_absolute_direction)
				decided = `warrior.walk('${my_absolute_direction}')`
			}
		}*/

		// then survival
		if (!decided && status.health <= (knowledge.MAX_HEALTH - knowledge.REST_HEALTH_INCREMENT)) {
			warrior.think(RADIX + `Seems safe, let's rest.`)
			warrior.rest()
			decided = `warrior.rest()`
		}

		// captives
		RELATIVE_DIRECTIONS.forEach(relative_direction => {
			if (decided) return

			if (status.surroundings[relative_direction].sensed === 'captive') {
				warrior.think(RADIX + `You are safe! [${relative_direction}]`)
				warrior.rescue(relative_direction)
				decided = `warrior.rescue('${relative_direction}')`
			}
		})

		// exploration
		if (!decided) {
			warrior.think(RADIX + `On we go!!`)

			if (status.surroundings.forward.sensed === 'wall') {
				warrior.think(RADIX + `Dead end...`)
				my_absolute_direction = ABSOLUTE_DIRECTION_OPPOSITE[my_absolute_direction]
				warrior.pivot('backward')
				decided = `warrior.pivot('backward')`
			}
			else {
				warrior.walk()
				decided = `warrior.walk() [${my_absolute_direction}]`
			}
		}

		warrior.think(RADIX + `decided: ${decided}`)

		status.memory.my_absolute_direction = my_absolute_direction
		last_status = status
	}
}
