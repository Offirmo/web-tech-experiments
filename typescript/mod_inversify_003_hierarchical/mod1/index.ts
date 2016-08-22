
import * as _ from 'lodash'

interface IModel {
	name: string
}

interface IModelCreationParams {
	schema_title: string
	name: string
}

interface IInjectableDependencies {
	schema: JSON
}

interface ILib {
	hid: string
	create: (data: IModelCreationParams) => IModel
	validate: (data: IModel) => void
	schema: JSON
}

function factory(deps: IInjectableDependencies): ILib {
	const schema = deps.schema

	function create(data: IModelCreationParams): IModel {
		return _.defaultsDeep({}, data, {
			schema_title: (schema as any).title
		}) as IModel
	}

	function validate(data: IModel) {}

	return {
		hid: 'mod1',
		create,
		validate,
		schema
	}
}

export {
	IModel,
	IModelCreationParams,
	IInjectableDependencies,
	ILib,
	factory
}
