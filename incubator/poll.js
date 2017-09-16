
function poll(predicate, {
    periodMs = 100, // check every 100ms
    timeoutMs = 10 * 1000,
    debugId = 'an unnamed predicate',
} = {}) {
    // early check to save an initial poll period
    let result = predicate()
    if (result)
        return Promise.resolve(result)

    return new Promise((resolve, reject) => {
        const periodicPredicatePoll = setInterval(() => {
            result = predicate()
            if (!result) return

            clearTimeout(waitForTimeout)
            clearInterval(periodicPredicatePoll)
            resolve(result)
        }, periodMs)

        const waitForTimeout = setTimeout(() => {
            clearInterval(periodicPredicatePoll)
            reject(new Error(`Timed out while waiting for "${debugId}"`))
        }, timeoutMs)
    })
}

function pollWindowVariable(varName, options = {}) {
    options = Object.assign({debugId: `window.${varName}`}, options)
    return poll(() => window[varName], options)
}

function pollAngularInjector(angular, options = {}) {
    options = Object.assign({debugId: `AngularJS current app $injector`}, options)
    // https://stackoverflow.com/a/13403660/587407
    // https://stackoverflow.com/a/15536532/587407
    return poll(() => angular.element(document.body).injector(), options)
}

function pollAngularModule(injector, name, options = {}) {
    options = Object.assign({debugId: `AngularJS module ${name}`}, options)
    return poll(() => injector.has(name), options)
        .then(() => injector.get(name))
}

function pollDOMSelectorPresence(selector, options = {}) {
    const parentElement = options.parentElement || document
    options.debugId = options.debugId || `DOMSelectorPresence "${selector}"`
    return poll(() => parentElement.querySelector(selector), options)
}

export {
    poll,
    pollWindowVariable,
    pollAngularInjector,
    pollAngularModule,
    pollDOMSelectorPresence,
}
