## Perte - beginner - level 8

### _You hear the mumbling of wizards. Beware of their deadly wands! Good thing you found a bow._

> **TIP:** Use `warrior.look()` to determine your surroundings, and `warrior.shoot()` to fire an arrow.


### Floor Map

```
╔══════╗
║@ Cww>║
╚══════╝

@ = Perte (20 HP)
C = Captive (1 HP)
w = Wizard (3 HP)
> = stairs
```

### Abilities

#### Actions (only one per turn)

* `warrior.shoot()`: Shoot your bow & arrow in the given direction (forward by default) dealing 3 HP of damage to the first unit in a range of 3 spaces.
* `warrior.walk()`: Move one space in the given direction (forward by default).
* `warrior.attack()`: Attack a unit in the given direction (forward by default) dealing 5 HP of damage.
* `warrior.rest()`: Gain 10% of max health back, but do nothing more.
* `warrior.rescue()`: Release a unit from his chains in the given direction (forward by default).
* `warrior.pivot()`: Rotate in the given direction (backward by default).

#### Senses

* `warrior.look()`: Returns an array of up to 3 spaces in the given direction (forward by default).
* `warrior.think()`: Think about your options before choosing an action (`console.log` replacement).
* `warrior.feel()`: Return the adjacent space in the given direction (forward by default).
* `warrior.health()`: Return an integer representing your health.

### Next Steps

When you're done editing `Player.js`, run the `warriorjs` command again.
