/* eslint-env node */
/* eslint no-var:0 */

// Useful for React & friends
var NODE_ENV = process.env.NODE_ENV || 'development'

// Hide Sirius URL behind SIRIUS_TARGET
// currently useful only for proxy
var SIRIUS_UPSTREAM_URL = 'https://sirius.fit.cvut.cz/staging/api/v1/'
if (process.env.SIRIUS_TARGET === 'production') {
  SIRIUS_UPSTREAM_URL = 'https://sirius.fit.cvut.cz/api/v1/'
}

// Which data source should be used by Fittable?
// Passed to client code.
var FITTABLE_SOURCE = process.env.FITTABLE_SOURCE || 'faux'

// Path to which bind proxy to and where client will send requests.
// Passed to client code.
// XXX: You need to keep this in sync with server configuration!
var SIRIUS_PROXY_PATH = process.env.SIRIUS_PROXY_PATH || '/api/sirius'

// Data Source Name with *public* client key for Sentry.
var SENTRY_DSN = process.env.SENTRY_DSN

module.exports = {
  NODE_ENV: NODE_ENV,
  FITTABLE_SOURCE: FITTABLE_SOURCE,
  SIRIUS_UPSTREAM_URL: SIRIUS_UPSTREAM_URL,
  SIRIUS_PROXY_PATH: SIRIUS_PROXY_PATH,
  SENTRY_DSN: SENTRY_DSN,
}
