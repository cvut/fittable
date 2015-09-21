/* eslint-env node */
/* eslint no-var:0 */

process.env.NODE_ENV = 'production'

var config = require('./webpack.config')

module.exports = config
