
export function setUpXHRInterceptor({
    window,
    quickFilter = (/*method, url*/) => true,
} = {}) {

    ////////////////////////////////////
    let requestWaiters = []
    function onXHRRequest(callback) {
        requestWaiters.push(callback)
    }
    let responsesWaiters = []
    function onXHRResponse(callback) {
        responsesWaiters.push(callback)
    }



    function onRequestSeen({method, url, body}) {
        if (!quickFilter(method, url)) return

        console.info('onRequestSeen', {method, url, body})

        requestWaiters.forEach(callback => callback({method, url, body}))
    }
    function onResponseSeen({method, url, body, status, response}) {
        if (!quickFilter(method, url)) return

        console.info('onResponseSeen', {method, url, body, status, response})

        responsesWaiters.forEach(callback => callback({method, url, body, status, response}))
    }

    // hook XMLHttpRequest
    const OriginalXMLHttpRequest = XMLHttpRequest
    window.XMLHttpRequest = function(params) {
        const request = new OriginalXMLHttpRequest(params)
        let method = null
        let url = null
        let body = null

        // intercept open() to get the method + url
        const originalOpen = request.open
        request.open = function() {
            method = (arguments[0] || 'GET').toUpperCase()
            url = (arguments[1] || '').toLowerCase()
            return originalOpen.apply(request, arguments)
        }

        // intercept request end
        //request.addEventListener('progress', () => console.log('progress', {method, url}, request))
        request.addEventListener('load', () => {
            let response = request.response
            if (typeof response === 'string') {
                try {
                    response = JSON.parse(response)
                }
                catch (e) {
                    // swallow
                }
            }
            onResponseSeen({
                method,
                url,
                body,
                status: request.status,
                response,
            })
        })
        request.addEventListener('error', () => console.error('XXX error', {method, url}, request))
        request.addEventListener('abort', () => console.error('XXX abort', {method, url}, request))
        //request.addEventListener('loadend', () => console.log('loadend', {method, url}, request))

        // intercept send() to get the optional body
        const originalSend = request.send
        request.send = function() {
            body = arguments[0]
            if (typeof body === 'string') {
                try {
                    body = JSON.parse(body)
                }
                catch (e) {
                    // swallow
                }
            }
            onRequestSeen({method, url, body})
            return originalSend.apply(request, arguments)
        }

        return request
    }

    // hook fetch()
    const originalFetch = fetch
    // https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch
    window.fetch = function(input, init) {
        const method = ((init ? init.method : null) || 'GET').toUpperCase()
        const url = (input || '').toLowerCase()
        const body = init ? init.body : null
        onRequestSeen({method, url, body})
        return originalFetch.apply(window, arguments)
            .then(response => {
                response.json()
                    .catch(() => response.text())
                    .catch(() => null)
                    .then(res => {
                        onResponseSeen({method, url, body, response: res})
                    })
                return response
            })
    }

    return {
        OriginalXMLHttpRequest,
        originalFetch,
        onXHRRequest,
        onXHRResponse,
    }
}
