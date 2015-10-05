import { compose, createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { mergePersistedState } from 'redux-localstorage'
import rootReducer from '../reducers'

const middlewares = [
  thunk,
]

if (process.env.NODE_ENV === 'development') {
  const createLogger = require('redux-logger')
  middlewares.push(createLogger())
}

let finalCreateStore = applyMiddleware(...middlewares)(createStore)

// Always rehydrate store
const reducer = compose(
  mergePersistedState()
)(rootReducer)

// Persistence is enabled only conditionally
if (global.window.localStorage) {
  const createPersistentStore = require('./persistence')
  finalCreateStore = createPersistentStore()(finalCreateStore)
}

const store = finalCreateStore(reducer)

export default store
