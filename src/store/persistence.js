import { compose } from 'redux'
import persistState from 'redux-localstorage'
import adapter from 'redux-localstorage/lib/adapters/localStorage'
import filter from 'redux-localstorage-filter'

// Key under which state will be stored
const STORAGE_KEY = 'fittable'
// What parts of store should be persisted
const STORAGE_FILTER = 'settings'

const storage = compose(
  filter(STORAGE_FILTER)
)(adapter(window.localStorage))

const createPersistentStore = () => {
  return persistState(storage, STORAGE_KEY)
}

export default createPersistentStore
