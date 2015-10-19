const TZ = 'Europe/Prague'

let SIRIUS_BASE_URL = 'https://sirius.fit.cvut.cz/staging/api/v1/'
if (process.env.SIRIUS_TARGET === 'production') {
  SIRIUS_BASE_URL = 'https://sirius.fit.cvut.cz/api/v1/'
}
// Allow final override from outside context (eg. HTML file)
if (global.SIRIUS_BASE_URL) {
  SIRIUS_BASE_URL = global.SIRIUS_BASE_URL
}

export {
  SIRIUS_BASE_URL,
  TZ
}
