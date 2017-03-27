import { isoDate } from './date'

function register (global, {changeDate, getCurrentDate}) {
  global.fittable = {
    changeDate,
    getCurrentDate,
    getCurrentDateStr: () => isoDate(getCurrentDate()),
  }

  return global.fittable
}

function unregister (global) {
  if (global.fittable) {
    delete global.fittable
    return true
  }
  return false
}

export default {
  register,
  unregister,
}
