/* eslint-disable max-classes-per-file */
'use strict'

const log = require('../utils/logger')

class AppError extends Error {
  constructor(message, example, status) {
    super()
    this.message = message
    this.example = example
    this.status = status
    log.error({
      error: {
        message: this.message,
        status: this.status,
      },
    })
  }
}

// If validation fails (validations/index.js)
// Then used in middleware/errors.js
class ValidationError extends AppError {
  constructor(customMessage) {
    // [QUESTION] Why add the type (BAD_REQUEST)
    const defaultMessage = 'Invalid or missing data'
    const example = { title: 'string', text: 'string' }

    super(customMessage || defaultMessage, example, 400)
  }
}

class NotFoundError extends AppError {
  constructor(customMessage) {
    const defaultMessage = 'ID not found'
    const example = { title: 'string', text: 'string' }

    super(customMessage || defaultMessage, example, 404)
  }
}

module.exports = {
  ValidationError,
  NotFoundError,
}
