import { compose, createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { mergePersistedState } from 'redux-localstorage'
import { reduxReactRouter } from 'redux-router'
import { createHistory, useBasename } from 'history'

import rootReducer from '../reducers'
import routes from '../routes'

const middlewares = [
  thunk,
]

if (process.env.NODE_ENV !== 'production') {
  const createLogger = require('redux-logger')
  middlewares.push(createLogger())
}

const reducer = compose(
  mergePersistedState()
)(rootReducer)

// Use history with <base href> support
const history = useBasename(createHistory)()

// Store enhancers
let finalCreateStore = compose(
  applyMiddleware(...middlewares),
  reduxReactRouter({
    routes,
    history,
  })
)(createStore)

// Persistence is enabled only conditionally
if (global.window.localStorage) {
  const createPersistentStore = require('./persistence')
  finalCreateStore = createPersistentStore()(finalCreateStore)
}

const store = finalCreateStore(reducer)

export default store
