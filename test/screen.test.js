import test from 'blue-tape'
import tk from 'timekeeper'
import * as screen from '../src/screen'
import * as screenSizes from '../src/constants/screenSizes.js'

test('isScreenSmall', t => {
  const screenSize = screenSizes.SMALL_SCREEN
  t.assert(screen.isScreenSmall(screenSize), 'returns true when screen is small')
  t.end()
})

test('isScreenMedium', t => {
  const screenSize = screenSizes.MEDIUM_SCREEN
  t.assert(screen.isScreenMedium(screenSize), 'returns true when screen is medium')
  t.end()
})

test('isScreenLarge', t => {
  const screenSize = screenSizes.LARGE_SCREEN
  t.assert(screen.isScreenLarge(screenSize), 'returns true when screen is large')
  t.end()
})

/* -- */

test('not isScreenSmall', t => {
  const screenSize = screenSizes.LARGE_SCREEN
  t.assert(!screen.isScreenSmall(screenSize), 'returns true when screen is not small')
  t.end()
})

test('not isScreenMedium', t => {
  const screenSize = screenSizes.SMALL_SCREEN
  t.assert(!screen.isScreenMedium(screenSize), 'returns true when screen is not medium')
  t.end()
})

test('not isScreenLarge', t => {
  const screenSize = screenSizes.MEDIUM_SCREEN
  t.assert(!screen.isScreenLarge(screenSize, 'returns true when screen is not large'))
  t.end()
})

/* -- */

test('isScreenMediumAndUp', t => {

  t.assert(!screen.isScreenMediumAndUp(screenSizes.SMALL_SCREEN),
    'returns false when screen is small')

  t.assert(screen.isScreenMediumAndUp(screenSizes.MEDIUM_SCREEN),
    'returns true when screen is medium')

  t.assert(screen.isScreenMediumAndUp(screenSizes.LARGE_SCREEN),
    'returns true when screen is large')

  t.end()
})

/* -- */

test('classByScreenSize', t => {
  const smallClass = 'class-for-small'
  const mediumClass = 'class-for-medium'
  const largeClass = 'class-for-large'

  const mappingArray = [
    smallClass, mediumClass, largeClass,
  ]

  const mappingArrayAssoc = {
    small: smallClass,
    medium: mediumClass,
    large: largeClass,
  }

  t.equal(screen.classByScreenSize(screenSizes.SMALL_SCREEN, mappingArray), smallClass,
    'returns class for small on small screen')

  t.equal(screen.classByScreenSize(screenSizes.MEDIUM_SCREEN, mappingArray), mediumClass,
    'returns class for medium on medium screen')

  t.equal(screen.classByScreenSize(screenSizes.LARGE_SCREEN, mappingArray), largeClass,
    'returns class for large on large screen')

  t.equal(screen.classByScreenSize(screenSizes.SMALL_SCREEN, mappingArrayAssoc), smallClass,
    'returns class for small on small screen (with assoc array)')

  t.equal(screen.classByScreenSize(screenSizes.MEDIUM_SCREEN, mappingArrayAssoc), mediumClass,
    'returns class for medium on medium screen (with assoc array)')

  t.equal(screen.classByScreenSize(screenSizes.LARGE_SCREEN, mappingArrayAssoc), largeClass,
    'returns class for large on large screen (with assoc array)')

  t.end()
})

test('isElementOutOfScreen()', t => {
  let fakeWindow = {
    innerWidth: 1366,
    innerHeight: 768,
  }

  let element = {
    style: { width: '200px', height: '200px' },
    offsetLeft: 0.9 * fakeWindow.innerWidth,
    offsetTop: 0,
  }

  t.equal(screen.isElementOutOfScreen(element, fakeWindow), true, 'returns true when the el. exceeds on the right')

  element.offsetTop = 0.99 * fakeWindow.innerHeight
  t.equal(screen.isElementOutOfScreen(element, fakeWindow), true, 'returns true when the el. exceeds right and bottom')

  element.offsetTop = -0.5 * fakeWindow.innerHeight
  t.equal(screen.isElementOutOfScreen(element, fakeWindow), true, 'returns true when the el. starts in negative pos')

  element.offsetTop = 0
  element.offsetLeft = 0.5 * fakeWindow.innerWidth
  element.style.width = '684px'
  t.equal(screen.isElementOutOfScreen(element, fakeWindow), true, 'returns true when the el. exceeds by 1 px')
  element.style.width = '682px'
  t.equal(screen.isElementOutOfScreen(element, fakeWindow), false, 'returns false when the el. has 1 px space')

  element.style.width = '200px'
  t.equal(screen.isElementOutOfScreen(element, fakeWindow), false, 'returns false when the el. doesn\'t exceeds')

  t.end()
})
