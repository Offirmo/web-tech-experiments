//import { createDeferred } from './promise-utils'

function factory({debugId}) {

    const store = {}

    const injector = {
        register,
        get,
        _: {
            store,
        }
    }

    function get(...rsrcIds) {
        if (!rsrcIds || !rsrcIds.length)
            throw new Error(`Mini injector get(): no resources!`)

        return Promise.all(
                rsrcIds
                .map(function validateParam(rsrcId) {
                    if (!store[rsrcId])
                        throw new Error(`Mini injector get(): unknown resource "${rsrcId}"!`)
                    return rsrcId
                })
                .map(rsrcId => store[rsrcId].promise)
            )
            .then(() => {
                const valuesHash = rsrcIds.reduce((acc, rsrcId) => {
                    acc[rsrcId] = store[rsrcId].resolvedValue
                    return acc
                }, {})
                return valuesHash
            })
    }

    function registerRsrc(rsrcId, generatorOrValue, dependencies) {
        if (store[rsrcId])
            throw new Error(`Mini injector: resource "${rsrcId}" already registered!`)

        dependencies.forEach(function validateParam(depId) {
            if (!store[depId])
                throw new Error(`Mini injector: missing dependency "${depId}" for generating resource "${rsrcId}"!`)
        })

        const rsrc = {
            id: rsrcId,
            dependencies,
            promise: undefined,
            isResolved: false,
            resolvedValue: undefined,
        }
        rsrc.promise = get(...dependencies)
            .then(valuesHash => {
                if (!generatorOrValue.then && typeof generatorOrValue === 'function') {
                    return generatorOrValue.call(undefined, valuesHash)
                }
                else {
                    return generatorOrValue
                }
            })

        rsrc.promise.then(value => {
            rsrc.isResolved = true
            rsrc.resolvedValue = value
            injector[rsrcId] = value // expose the value directly on the injector for convenience
        })
        store[rsrcId] = rsrc

        return rsrc.promise
    }

    function register(rsrcsDefinition) {
        Object.keys(rsrcsDefinition).forEach(rsrcId => {
            let generatorOrValue = rsrcsDefinition[rsrcId]
            let dependencies = []
            if (Array.isArray(generatorOrValue)) {
                dependencies = generatorOrValue
                generatorOrValue = dependencies.pop()
            }
            registerRsrc(rsrcId, generatorOrValue, dependencies)
        })

        return get(...Object.keys(rsrcsDefinition))
    }

    injector.register({
        debugId,
        injector,
    })

    const safeInjector = new window.Proxy(injector, {
        get(target, name) {
            if (name === 'get') return target[name]
            if (name === 'register') return target[name]
            if (!store[name])
                throw new Error(`Mini injector direct access: unknown resource "${name}"!`)
            if (!store[name].isResolved)
                throw new Error(`Mini injector direct access: synchronously trying to access unresolved resource "${name}"!`)
            return target[name]
        },
        set(obj, prop, value) {
            throw new Error(`Mini injector '.': messing with the injector ("${prop}" = "${value}") is not allowed!`)
        }
    })

    return safeInjector
}

export {
    factory,
}


/*
const I = factory({debugId: 'FOOTEST'})

// forbidden:
//console.log('get foo', I.foo)
//I.foo = 5

I.get('debugId').then(() => {
    console.log('got debugId:', I.debugId)
})

I.register({
    catchFn: [ 'debugId', ({debugId}) => {
        return () => console.log('catch ' + debugId)
    }],
})
    .then(({catchFn}) => {
        console.log({catchFn})
        catchFn()
    })

console.log({I})

//I.get('foo').then(console.log)

            const I = factory({debugId: EXPERIMENT_ID})
            I.register({
                AJS: pollWindowVariable('AJS'),
                'AJS.meta': ['AJS', ({AJS}) => poll(() => AJS.Meta, {debugId: 'AJS.meta'})],
                adgVersion: ['AJS.meta', () => isADG3() ? 3 : 2]
            })
*/
