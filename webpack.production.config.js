/* eslint-env node */
/* eslint no-var:0 */

process.env.NODE_ENV = 'production'
process.env.FITTABLE_SOURCE = 'sirius'

var config = require('./webpack.config')

module.exports = config
