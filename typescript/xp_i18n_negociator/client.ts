'use strict'

import { BCP47Locale, BrowserLocaleHints } from './types'

console.log('Hello from locale negociator !')

// https://developer.mozilla.org/en-US/docs/Web/API/NavigatorLanguage
interface ModernNavigator extends Navigator {
	languages?: Array<string>
}

function gather_hints(window: Window) {
	const navigator: ModernNavigator = window.navigator

	const browser_hints: BrowserLocaleHints = {

		from_navigator_language:
		navigator.language,

		from_navigator_languages:
		navigator.languages,

		from_url_query_string_lang:
			null
	}

	return browser_hints
}

console.log('hints', gather_hints(window))
