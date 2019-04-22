/* eslint-disable no-warning-comments */
/* eslint-disable no-unused-vars */
'use strict'

const jsonschema = require('jsonschema')
const errors = require('../utils/errors')
const log = require('../utils/logger')

function validate(schema, input) {

  const validator = new jsonschema.Validator()
  const validationErrors = validator.validate(input, schema).errors
  if (validationErrors.length > 0) {
    log.error(validationErrors)
    throw new errors.ValidationError()
  }
  log.info('validation passed')
}

module.exports = {
  validate,
}
