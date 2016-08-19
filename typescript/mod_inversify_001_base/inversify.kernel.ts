import { Kernel } from "inversify"

import TYPES from "./types"
import { Warrior, Weapon, ThrowableWeapon } from "./interfaces"
import { Ninja, Katana, Shuriken } from "./entities"

var kernel = new Kernel()

kernel.bind<Warrior>(TYPES.Warrior).to(Ninja)
kernel.bind<Weapon>(TYPES.Weapon).to(Katana)
kernel.bind<ThrowableWeapon>(TYPES.ThrowableWeapon).to(Shuriken)

export default kernel
