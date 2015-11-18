import { compose, createStore as createReduxStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { mergePersistedState } from 'redux-localstorage'
import { reduxReactRouter } from 'redux-router'
import { createHistory, useBasename } from 'history'

import rootReducer from '../reducers'
import routes from '../routes'

function createStore (initialState) {
  const middlewares = [
    thunk,
  ]

  if (process.env.NODE_ENV !== 'production') {
    const createLogger = require('redux-logger')
    middlewares.push(createLogger())
  }

  let reducer = rootReducer

  // Use history with <base href> support
  // FIXME: Add support for memory history in Node env
  const history = useBasename(createHistory)()

  // Store enhancers
  let finalCreateStore = compose(
    applyMiddleware(...middlewares),
    reduxReactRouter({
      routes,
      history,
    })
  )(createReduxStore)

  // Persistence is enabled only conditionally
  if (global.localStorage) {
    const createPersistentStore = require('./persistence')
    finalCreateStore = createPersistentStore()(finalCreateStore)
    reducer = compose(
      mergePersistedState()
    )(reducer)
  }

  const store = finalCreateStore(reducer, initialState)

  if (module.hot) {
    const nextReducer = require('../reducers')
    module.hot.accept('../reducers', () => {
      store.replaceReducer(nextReducer)
    })
  }

  return store
}

export default createStore
