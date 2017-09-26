

function createDeferred() {
    let resolve;
    let reject;
    const promise = new Promise((resolve_, reject_) => {
        resolve = resolve_;
        reject = reject_;
    });

    return {promise, resolve, reject};
}

function rejectAfterTimeout(options = {}) {
    const {timeoutMs, debugId} = Object.assign({
        timeoutMs: 10 * 1000,
        debugId: 'an unnamed promise',
    }, options);

    const promise = new Promise((resolve, reject) => setTimeout(
            () => reject(new Error(`Timed out waiting for promised "${debugId}"!`)),
            timeoutMs
        ));

    promise.catch(() => {
        // we need at least one catch on this promise so that it doesn't trigger an "uncaught rejection"
        // when it naturally comes to an end before being used once (can happen if a sync error happen first)
        // swallow.
    });

    return promise;
}

function resolveBeforeSharedTimeout(promise, timeoutPromise, debugId) {
    // it's the whole point of this function!
    if (!debugId)
        throw new Error('resolveRacingTimeout(): no debug id!');

    // assuming the only rejection cause is the timeout
    const timeoutPromiseWithBetterErrorMessage = timeoutPromise
        .catch(() => {
            throw new Error(`Timed out waiting for promised "${debugId}"!`);
        });

    return Promise.race([
        promise,
        timeoutPromiseWithBetterErrorMessage,
    ]);
}

export {
    createDeferred,
    rejectAfterTimeout,
    resolveBeforeSharedTimeout,
};
