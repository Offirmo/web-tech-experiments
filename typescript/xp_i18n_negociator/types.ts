
type BCP47Locale = string

// https://developer.mozilla.org/en-US/docs/Web/API/NavigatorLanguage
interface BrowserLocaleHints {
	// from navigator.language
	// https://developer.mozilla.org/en-US/docs/Web/API/NavigatorLanguage/language
	// the preferred language of the user, usually the language of the browser UI.
	// The null value is returned when this is unknown.
	from_navigator_language: BCP47Locale | null
	// from navigator.languages
	// https://developer.mozilla.org/en-US/docs/Web/API/NavigatorLanguage/languages
	// representing the user's preferred languages, ordered by preference with the most preferred language first.
	from_navigator_languages: BCP47Locale[] | null
	// lang=fr
	from_url_query_string_lang: BCP47Locale
	// ???
	//userLanguage: navigator.userLanguage,
	//systemLanguage: navigator.systemLanguage
}

interface ServerLocaleHints {

	// We allow storing user choice in a http-only cookie
	from_explicitly_set_cookie: BCP47Locale | undefined

	//
	from_ip_geolocation: BCP47Locale | undefined

	//
	from_header_HTTP_ACCEPT_LANGUAGE: BCP47Locale[]

	// the very common ?lang=fr
	// should never be used except for demo/debug
	// for fear a user share or bookmark it "as is"
	// but we'll honor it anyway
	from_url_query_string_lang: BCP47Locale | undefined
}

interface LocaleHints {

}

interface LocaleNegotiationResult {

}

export {
	BCP47Locale,
	BrowserLocaleHints,
	ServerLocaleHints,
	LocaleHints,
	LocaleNegotiationResult
}
