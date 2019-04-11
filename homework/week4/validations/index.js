/* eslint-disable no-unused-vars */
'use strict'

const jsonschema = require('jsonschema')

function validate(schema, input) {
  const validator = new jsonschema.Validator()

  // -----
  console.log(validator.validate(input, schema))
  // -----

  const validationErrors = validator.validate(input, schema).errors
}

module.exports = {
  validate,
}
