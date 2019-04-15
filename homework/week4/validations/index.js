/* eslint-disable no-warning-comments */
/* eslint-disable no-unused-vars */
'use strict'

const jsonschema = require('jsonschema')
const errors = require('../utils/errors')

function validate(schema, input) {
  // [Question] How does the Validator constructor/class work? Not necessary to dig into because it's a third party package.
  const validator = new jsonschema.Validator()
  const validationErrors = validator.validate(input, schema).errors

  if (validationErrors.length > 0) {
    throw new errors.ValidationError()
  }
}

module.exports = {
  validate,
}
