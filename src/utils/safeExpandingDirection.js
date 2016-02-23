function whereExceedsLess (elementPosition, elementLength, axisLength) {
  const negativeExceed = -1 * (elementPosition - elementLength)
  const positiveExceed = elementPosition + elementLength - axisLength

  // If exceeds are the same or both negative
  if (negativeExceed === positiveExceed || !negativeExceed && !positiveExceed) {
    return 0
  }

  return negativeExceed < positiveExceed ? -1 : 1
}

function safeExpandingDirection ({ x, y, width, height }, window, defaultDir) {
  const {innerWidth, innerHeight} = window

  const bestHorizontal = whereExceedsLess(x, width, innerWidth)
  const bestVertical = whereExceedsLess(y, height, innerHeight)

  // Set best directions, or leave the defaults
  const horizontal = bestHorizontal !== 0 ? bestHorizontal : defaultDir.horizontal
  const vertical = bestVertical !== 0 ? bestVertical : defaultDir.vertical

  return {horizontal, vertical}
}

export default safeExpandingDirection
