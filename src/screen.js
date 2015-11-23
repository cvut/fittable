import { SMALL_SCREEN, MEDIUM_SCREEN, LARGE_SCREEN } from './constants/screenSizes'

export function isScreenSmall (screenSize) {
  return screenSize === SMALL_SCREEN
}

export function isScreenMedium (screenSize) {
  return screenSize === MEDIUM_SCREEN
}

export function isScreenMediumAndUp (screenSize) {
  return screenSize >= MEDIUM_SCREEN
}

export function isScreenLarge (screenSize) {
  return screenSize === LARGE_SCREEN
}

/**
 * Maps actual screen size to classes specified in the second parameter
 * The second parameter should be array with classnames sorted from small to large,
 * or associative array with keys 'small', 'medium' and 'large'.
 * @param {number} screenSize
 * @param {*} classes
 * @returns {string} Class name by screen size
 */
export function classByScreenSize (screenSize, classes) {
  if (isScreenSmall(screenSize)) {
    return classes['small'] || classes[0]
  } else if (isScreenMedium(screenSize)) {
    return classes['medium'] || classes[1]
  } else {
    return classes['large'] || classes[2]
  }
}

export function isElementOutOfScreen (element, window) {
  let {
    innerWidth: screenWidth,
    innerHeight: screenHeight,
  } = window

  let {
    offsetLeft: elementLeft,
    offsetTop: elementTop,
    style: { width: elementWidth, height: elementHeight },
  } = element

  // Convert strings with 'px' to numbers
  elementWidth = parseFloat(elementWidth)
  elementHeight = parseFloat(elementHeight)

  // Test exceeding
  const exceedsWidth = elementLeft < 0 || elementLeft + elementWidth > screenWidth
  const exceedsHeight = elementTop < 0 || elementTop + elementHeight > screenHeight

  return exceedsWidth || exceedsHeight
}
