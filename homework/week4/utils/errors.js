/* eslint-disable max-classes-per-file */
'use strict'

const log = require('../utils/logger')

class AppError extends Error {
  constructor(properties) {
    super()
    this.message = properties.message
    this.example = properties.example
    this.status = properties.status
    this.type = properties.type
    // Logging for the terminal:
    log.error({
      error: { status: this.status, type: this.type, message: this.message },
    })
  }
}

// If validation fails (validations/index.js)
// Then used in middleware/errors.js
class ValidationError extends AppError {
  constructor(customMessage) {
    const properties = {
      status: 400,
      type: 'BAD_REQUEST',
      message: customMessage || 'Invalid or missing data!',
      example: { title: 'string', text: 'string' },
    }
    super(properties)
  }
}

class NotFoundError extends AppError {
  constructor(customMessage) {
    const properties = {
      status: 404,
      type: 'NOT_FOUND',
      message: customMessage || 'ID not found',
      example: { title: 'string', text: 'string' },
    }
    super(properties)
  }
}

class InternalServerError extends AppError {
  constructor(customMessage) {
    const properties = {
      status: 500,
      type: 'INTERNAL_SERVER',
      message: customMessage || 'Something went horribly wrong on our side',
    }
    super(properties)
  }
}

module.exports = {
  AppError,
  ValidationError,
  NotFoundError,
  InternalServerError,
}
