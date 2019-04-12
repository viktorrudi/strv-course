/* eslint-disable max-classes-per-file */
'use strict'

const log = require('../utils/logger')

class AppError extends Error {
  constructor(message, example, status) {
    super()
    this.message = message
    this.status = status
    this.example = example
    log.error({
      error: {
        message: this.message,
      },
    })
  }
}

// If validation fails (validations/index.js)
// Then used in middleware/errors.js
class ValidationError extends AppError {
  constructor() {
    // [QUESTION] Why add the type (BAD_REQUEST)
    const message = 'Invalid or missing data'
    const example = { title: 'string', text: 'string' }
    super(message, example, 400)
  }
}

module.exports = {
  ValidationError,
}
