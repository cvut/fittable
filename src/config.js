export const TZ = 'Europe/Prague'

export const SIRIUS_PROXY_PATH = global.SIRIUS_PROXY_PATH || process.env.SIRIUS_PROXY_PATH

let SIRIUS_BASE_URL = 'https://sirius.fit.cvut.cz/staging/api/v1/'
if (process.env.SIRIUS_TARGET === 'production') {
  SIRIUS_BASE_URL = 'https://sirius.fit.cvut.cz/api/v1/'
}
// Allow final override from outside context (eg. HTML file)
if (global.SIRIUS_BASE_URL) {
  SIRIUS_BASE_URL = global.SIRIUS_BASE_URL
}

const FACULTY_ID = 18000 // FIT CTU faculty

export {
  FACULTY_ID,
  SIRIUS_BASE_URL,
  TZ,
}
