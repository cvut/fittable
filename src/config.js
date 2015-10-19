const TZ = 'Europe/Prague'

let SIRIUS_BASE_URL = 'https://sirius.fit.cvut.cz/staging/api/v1/'
if (process.env.SIRIUS_TARGET === 'production') {
  SIRIUS_BASE_URL = 'https://sirius.fit.cvut.cz/api/v1/'
}

export {
  SIRIUS_BASE_URL,
  TZ
}
