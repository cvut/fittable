import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from '../reducers'

const middlewares = [
  thunk,
]

if (process.env.NODE_ENV === 'development') {
  const createLogger = require('redux-logger')
  middlewares.push(createLogger())
}

const finalCreateStore = applyMiddleware(...middlewares)(createStore)

const store = finalCreateStore(rootReducer)

export default store
