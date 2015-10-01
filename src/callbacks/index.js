// XXX: CommonJS for conditional import
if (process.env.FITTABLE_SOURCE === 'sirius') {
  module.exports = require('./sirius')
} else {
  module.exports = require('./faux')
}
