import { CLIENT_CHANGE } from '../constants/actionTypes'
import { SMALL_SCREEN, SMALL_SCREEN_BREAKPOINT, MEDIUM_SCREEN, MEDIUM_SCREEN_BREAKPOINT, LARGE_SCREEN } from '../constants/screenSizes'

function isSmallScreen () {
  return global.window.innerWidth < SMALL_SCREEN_BREAKPOINT
}

function isMediumScreen () {
  return global.window.innerWidth < MEDIUM_SCREEN_BREAKPOINT
}

function clientChange (screenSize) {
  return {
    type: CLIENT_CHANGE,
    payload: { screenSize },
  }
}

export function detectScreenSize () {
  return function windowResizeThunk (dispatch, getState) {
    const {client} = getState()

    let screenSize = LARGE_SCREEN
    if (isSmallScreen()) {
      screenSize = SMALL_SCREEN
    } else if (isMediumScreen()) {
      screenSize = MEDIUM_SCREEN
    }

    if (client.screenSize !== screenSize) {
      dispatch(clientChange(screenSize))
    }
  }
}
