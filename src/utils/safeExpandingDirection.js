function whereOverflowLess (elementPosition, elementLength, axisLength) {
  const negativeOverflow = -1 * (elementPosition - elementLength)
  const positiveOverflow = elementPosition + elementLength - axisLength

  // If overflows are the same or both negative
  if (negativeOverflow === positiveOverflow || negativeOverflow < 0 && positiveOverflow < 0) {
    return 0
  }

  return negativeOverflow < positiveOverflow ? -1 : 1
}

/**
 * This function receives a window (outer rectangle), coordinates of a point inside the
 * window, size of a rectangle that should fit into the window (if possible), and a default
 * value. One of the rectangle's corner must be placed at the point; the function returns which
 * one. Returns the provided default, if fits. If not and a better option exists, then it returns
 * the better one.
 *
 * @param point
 * @param size
 * @param window Browser's window object
 * @param defaultCorner Default corner, expects object with properties "horizontal" and "vertical"
 *        with values -1 or 1.
 * @returns Corner to place rectangle at, object with properties "horizontal" and "vertical"
 *          with values -1 or 1.
 */
function safeExpandingDirection ([x, y], [width, height], window, defaultCorner) {
  const {innerWidth, innerHeight} = window

  // Gets best directions to place the rectangle
  const bestHorizontal = whereOverflowLess(x, width, innerWidth)
  const bestVertical = whereOverflowLess(y, height, innerHeight)

  // Set best corners (corner is negative direction), or leave the defaults
  const horizontal = bestHorizontal !== 0 ? -bestHorizontal : defaultCorner.horizontal
  const vertical = bestVertical !== 0 ? -bestVertical : defaultCorner.vertical

  return {horizontal, vertical}
}

export default safeExpandingDirection
