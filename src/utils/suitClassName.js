import R from 'ramda'

const keysOfTruthyValues = R.pipe(
  R.filter(R.identity),
  R.keys
)

/**
 * Generate a class name according to SUIT CSS naming convention.
 *
 * @param {string} componentName The component name.
 * @param {string} [descendentName] The descendent element name.
 * @param {string[]} [modifiers] The element modifiers.
 * @param {object} [states] The states of the component, e.g. `{ selected: true } -> '.is-selected'`
 * @return {string} A class name.
 */
function suitClassName (componentName, descendentName = null, modifiers = [], states = {}) {
  const elementName = componentName + (descendentName ? `-${descendentName}` : '')

  // Construct a strings of modifiers and states.
  const classes = R.concat(
    R.map(R.concat(`${elementName}--`), modifiers),
    R.map(R.concat('is-'), keysOfTruthyValues(states))
  )

  // Join the element name with descendents and modifiers with states.
  return [elementName, ...classes].join(' ')
}

export default suitClassName
