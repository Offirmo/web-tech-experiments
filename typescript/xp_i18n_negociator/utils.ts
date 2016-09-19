import * as _ from 'lodash'

import { BCP47Locale } from './types'

/** validate that given locale is a correct "BCP 47 locale code"
 * and try to fix it if needed.
 * returns undef if not valid.
 */
function normalize_and_validate_bcp47_locale(suspicious_locale: string | undefined): BCP47Locale | undefined {
	if(! suspicious_locale) return
	if(! _.isString(suspicious_locale)) return
	if(suspicious_locale.length < 2) return

	// TODO more, one day ;-)

	return _.toLower(suspicious_locale)
}


export {
	normalize_and_validate_bcp47_locale
}
