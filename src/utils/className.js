import R from 'ramda'

function getKeysOfTruthyValues (object) {
  return R.keys(R.filter(n => n, object))
}

/**
 * Function generating class name according to SUIT CSS naming convention.
 *
 * @param [string] componentName Component name
 * @param [arrayOf(string)] descendants Array of descendants in hierarchic order (-desc1-desc2-...) (optional)
 * @param [arrayOf(string)] modifiers Element modifier (optional)
 * @param [object] states States of component, { selected: true } -> '...-isSelected'
 */
function className (componentName, descendants = null, modifiers = [], states = {}) {
  const elementName = R.join('-', R.prepend(componentName, descendants))

  // Construct a strings of modifiers and states
  const modifiersClasses = R.map(modifier => elementName + '--' + modifier, modifiers)
  const stateClasses = R.map(state => 'is-' + state, getKeysOfTruthyValues(states))

  // Join the element name with descendants and modifiers with states
  return R.join(' ', R.prepend(elementName, R.concat(modifiersClasses, stateClasses)))
}

export default className
