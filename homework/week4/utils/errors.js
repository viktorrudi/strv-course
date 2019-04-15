/* eslint-disable max-classes-per-file */
'use strict'

const log = require('../utils/logger')

class AppError extends Error {
  constructor(properties) {
    super()
    this.message = properties.message
    this.example = properties.example
    this.status = properties.status
    // [QUESTION] When is this called?
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
    const properties = {
      message: customMessage || 'Invalid or missing data!',
      example: { title: 'string', text: 'string' },
      status: 400,
    }
    super(properties)
  }
}

class NotFoundError extends AppError {
  constructor(customMessage) {
    const properties = {
      message: customMessage || 'ID not found',
      example: { title: 'string', text: 'string' },
      status: 404,
    }
    super(properties)
  }
}

class InternalServerError extends AppError {
  constructor(customMessage) {
    const properties = {
      message: customMessage || 'Something went horribly wrong on our side',
      status: 500,
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
