/**
 * This function receives length of an outer line (available space), point on
 * the line and length of an inner line. One of the inner line's end must be
 * placed at the point. The function returns which one is better to maximize
 * lines overlap: -1 for right, +1 for left, or 0 when it doesn't matter.
 */
function whereOverflowLess (position, innerLength, outerLength) {
  const leftOverflow = innerLength - position
  const rightOverflow = innerLength - (outerLength - position)

  if (leftOverflow === rightOverflow || leftOverflow < 0 && rightOverflow < 0) {
    return 0
  } else if (leftOverflow < rightOverflow) {
    return -1
  } else {
    return 1
  }
}

/**
 * This function receives a window (outer rectangle), coordinates of a point inside the
 * window, size of a rectangle that should fit into the window (if possible), and a default
 * value. One of the rectangle's corner must be placed at the point; the function returns which
 * one. Returns the provided default, if fits. If not and a better option exists, then it returns
 * the better one.
 *
 * For example, if the inner rectangle doesn't fit the window and overflows on the right side,
 * the function returns `{ horizontal: 1, vertical: -1 }`, which means it should stick to the upper
 * right corner (i.e. expand to the bottom left).
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
  const { innerWidth, innerHeight } = window

  // Gets best directions to place the rectangle
  const bestHorizontal = whereOverflowLess(x, width, innerWidth)
  const bestVertical = whereOverflowLess(y, height, innerHeight)

  // Set best corners (corner is negative direction), or leave the defaults
  const horizontal = bestHorizontal !== 0 ? -bestHorizontal : defaultCorner.horizontal
  const vertical = bestVertical !== 0 ? -bestVertical : defaultCorner.vertical

  return { horizontal, vertical }
}

export default safeExpandingDirection
