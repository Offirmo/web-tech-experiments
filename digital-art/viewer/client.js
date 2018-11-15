import { POSTMSG_NAMESPACE } from './common.js'

export function sendMsgToViewer(data) {
	const parentOrigin = getParentDocumentOrigin({ window })
	if (!parentOrigin) {
		console.warn('Missing viewer!')
		return
	}

	const msg = {
		[POSTMSG_NAMESPACE]: data,
	};

	console.log(`[artwork] ← postMessage: sending message:`, msg);

	return window.parent.postMessage(msg, parentOrigin);
}

export function getParentDocumentOrigin({ window }) {
	try {
		if (window.parent === window) {
			// we have no parent
			return null
		}

		// we can't inspect our parent window (rightfully blocked by cross-origin)
		// so we rely on the referrer
		const parentUrl = window.document.referrer
		return parentUrl ? new URL(parentUrl).origin : null
	} catch (err) {
		getLogger().warn("getParentDocumentOrigin error", { err })
		return null;
	}
}
