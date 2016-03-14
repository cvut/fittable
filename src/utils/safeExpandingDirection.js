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
 * one, but inverted. Returns the provided default, if fits. If not and a better option exists,
 * then it returns the better one.
 *
 * For example, if the inner rectangle doesn't fit the window and overflows on the right side,
 * the function returns `{ right: false, bottom: true }` (when `bottom: true` is the default),
 * which means it should expand to the bottom-left.
 *
 * @param {Array} point A tuple with x and y coordinates.
 * @param {Array} size A tuple with width and height.
 * @param window The browser's window object.
 * @param defaultDir The default direction; expects an object with boolean properties "bottom"
 *        and "right".
 * @returns A direction for expanding; an object with boolean properties "bottom" and "right".
 */
function safeExpandingDirection ([x, y], [width, height], window, defaultDir) {
  const { innerWidth, innerHeight } = window

  // Get best directions to place the rectangle.
  const bestHorizontal = whereOverflowLess(x, width, innerWidth)
  const bestVertical = whereOverflowLess(y, height, innerHeight)

  // Set best direction, or leave the defaults.
  const right = bestHorizontal !== 0 ? bestHorizontal === 1 : defaultDir.right
  const bottom = bestVertical !== 0 ? bestVertical === 1 : defaultDir.bottom

  return { right, bottom }
}

export default safeExpandingDirection
