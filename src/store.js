import { compose, createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import rootReducer from './reducers'

// Redux DevTools store enhancers
import { devTools, persistState } from 'redux-devtools'

const finalCreateStore = compose(
  applyMiddleware(
    thunkMiddleware
  ),
  // Provides support for DevTools:
  devTools(),
  // Lets you write ?debug_session=<name> in address bar to persist debug sessions
  persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
)(createStore)

const store = finalCreateStore(rootReducer)

export default store
