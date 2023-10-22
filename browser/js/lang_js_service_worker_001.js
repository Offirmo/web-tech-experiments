
const activation_date = Date.now()

console.log('[ServiceWorker] hello', { self, activation_date })

self.addEventListener('install', (event) => {
	console.log('[ServiceWorker] ⚡️install', { event })

	// https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerGlobalScope/skipWaiting
	/*
	While self.skipWaiting() can be called at any point during the service worker's execution, it will only have an effect if there's a newly installed service worker that might otherwise remain in the waiting state. Therefore, it's common to call self.skipWaiting() from inside of an InstallEvent handler.

The following example causes a newly installed service worker to progress into the activating state, regardless of whether there is already an active service worker.
	 */
	self.skipWaiting()
})

self.addEventListener('activate', (event) => {
	/*  activate event
	The point where this event fires is generally a good time
	to clean up old caches and other things associated with
	the previous version of your service worker.
	 */
	console.log('[ServiceWorker] ⚡️activate', { event })

	// https://developer.mozilla.org/en-US/docs/Web/API/Clients/claim
	//event.waitUntil(clients.claim());
})

self.addEventListener('fetch', (event) => {
	console.log('[ServiceWorker] ⚡️fetch', { event })
})
