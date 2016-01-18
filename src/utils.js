import R from 'ramda'

// Because R.addIndex(R.forEach) is very slow...
export const forEachWithIndex = R.curry(
  (func, list) => list.forEach(func)
)

/**
 * Groups the elements of the list according to the result of calling
 * the String-returning function `keyFn` on each element and reduces the elements
 * of each group to a single value via the reducer function `valueFn`.
 *
 * This function is basically a more general `groupBy` function.
 *
 * TODO: Remove after https://github.com/ramda/ramda/pull/1598 is merged into Ramda.
 *
 * @sig (b -> String) -> ((a, b) -> a) -> a -> [b] -> {String: a}
 */
export const reduceBy = R.curry((keyFn, valueFn, valueAcc, list) => {
  return R.reduce((acc, elt) => {
    const key = keyFn(elt)
    acc[key] = valueFn(acc[key] || valueAcc, elt)
    return acc
  }, {}, list)
})
