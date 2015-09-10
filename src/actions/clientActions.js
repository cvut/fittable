import { CLIENT_CHANGE } from '../constants/actionTypes'

function isSmallScreen () {
  return global.window.innerWidth <= 768
}

function clientChange (smallScreen) {
  return {
    type: CLIENT_CHANGE,
    payload: { smallScreen },
  }
}

export function detectScreenSize () {
  return function windowResizeThunk (dispatch, getState) {
    const {client} = getState()
    const smallScreen = isSmallScreen()
    if (client.smallScreen !== smallScreen) {
      dispatch(clientChange(smallScreen))
    }
  }
}
