import { POSTMSG_NAMESPACE } from './common.js'

function listenForSafePostMessages({
	logger = console,
	window,
	debugId,
	isOriginAllowed,
	onMessage,
}) {
	function onMessageInternal(event) {
		if (!isOriginAllowed(event.origin)) {
			// no big deal, some browser extensions and some libs (ex. google) send postMessage
			logger.log(
				`${debugId} - postMessage: Ignoring, wrong origin: "${event.origin}".`,
			)
			return
		}

		if (
			!event.data ||
			typeof event.data !== 'object' ||
			!event.data[POSTMSG_NAMESPACE]
		) {
			// no big deal, google apis client sends a postMessage to parents on load
			logger.log(
				`${debugId} - 💌 postMessage: Ignoring, unrecognized data format.`,
				event.data,
			)
			return
		}

		logger.log(`${debugId} - 💌 postMessage: received valid message:`, event.data)

		onMessage({
			origin: event.origin,
			source: event.source,
			data: event.data[POSTMSG_NAMESPACE],
		})
	}

	const listenerOptions = {
		capture: false, // https://devdocs.io/dom/window/postmessage
	}

	window.addEventListener('message', onMessageInternal, listenerOptions)

	return function removeListener() {
		window.removeEventListener('message', onMessageInternal, listenerOptions)
	}
}

export {
	listenForSafePostMessages
}
