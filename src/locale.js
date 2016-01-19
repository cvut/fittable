import CP from 'counterpart'

/**
 * Translates, pluralizes and interpolates the given key using the specified
 * locale, scope, and fallback, as well as interpolation values.
 *
 * If the key is null or undefined and the options contains `fallback`, then
 * the fallback is returned.
 *
 * @sig (String, {*}) -> String
 */
export function translate (key, options = {}) {
  if (!key && 'fallback' in options) {
    return options.fallback
  }
  return CP.translate(key, options)
}
