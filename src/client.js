import { is } from 'ramda'

/**
 * Detects if there is an information about browser language.
 * If not, returns 'cs'. If there is the information and the language
 * string starts with 'cs', returns 'cs', otherwise 'en'.
 */
export function browserLanguage (navigatorLanguage = 'cs') {
  if (is(String, navigatorLanguage) && navigatorLanguage.toLowerCase().startsWith('cs')) {
    return 'cs'
  }
  return 'en'
}
