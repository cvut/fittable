import R from 'ramda'

function getKeysOfTruthyValues (object) {
  return R.keys(R.filter(n => n, object))
}

/**
 * Function generating class name according to SUIT CSS naming convention.
 *
 * @param [string] componentName Component name
 * @param [string] descendent Descendent element (optional)
 * @param [arrayOf(string)] modifiers Element modifier (optional)
 * @param [object] states States of component, { selected: true } -> '.is-selected'
 */
function className (componentName, descendent = null, modifiers = [], states = {}) {
  const elementName = componentName + (descendent ? '-' + descendent : '')

  // Construct a strings of modifiers and states
  const modifiersClasses = R.map(modifier => elementName + '--' + modifier, modifiers)
  const stateClasses = R.map(state => 'is-' + state, getKeysOfTruthyValues(states))

  // Join the element name with descendents and modifiers with states
  return R.join(' ', R.prepend(elementName, R.concat(modifiersClasses, stateClasses)))
}

export default className
