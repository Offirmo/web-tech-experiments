
import * as Mod1 from './mod1'

type Mod1Schema = JSON
type Mod1StaticData = Mod1.IModelCreationParams[]
type Mod1Factory = () => Mod1.ILib

let TYPES = {
	Mod1Schema: Symbol('Mod1Schema'),
	Mod1StaticData: Symbol('Mod1StaticData'),
	Mod1Factory: Symbol('Mod1Factory'),
}

export {
	Mod1Schema,
	Mod1StaticData,
	Mod1Factory,
	TYPES
}
