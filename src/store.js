import { compose, createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import rootReducer from './reducers'

// Redux DevTools store enhancers
import { devTools, persistState } from 'redux-devtools'

const storePlugins = [
  applyMiddleware(
    thunkMiddleware
  ),
]

if (__DEV__) {
  storePlugins.push(devTools())
  storePlugins.push(persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/)))
}

const finalCreateStore = compose(...storePlugins)(createStore)

const store = finalCreateStore(rootReducer)

export default store
