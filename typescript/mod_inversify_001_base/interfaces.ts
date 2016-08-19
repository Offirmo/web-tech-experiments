interface Warrior {
	fight(): string
	sneak(): string
}

interface Weapon {
	hit(): string
}

interface ThrowableWeapon {
	throw(): string
}

export {
	Warrior,
	Weapon,
	ThrowableWeapon,
}
