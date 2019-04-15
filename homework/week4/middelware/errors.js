/* eslint-disable node/no-unsupported-features/es-syntax */
'use strict'

const errors = require('../utils/errors')
const log = require('../utils/logger')

// Triggered in routes
async function handleErrors(ctx, next) {
  try {
    // If no errors, continue to next middleware
    return await next()
  } catch (err) {
    let receivedError = err

    if (!(err instanceof errors.AppError)) {
      // If the error triggered isn't in utils/errors
      log.error(err)
      receivedError = new errors.InternalServerError()
    }

    // Set response status code and body message
    ctx.status = receivedError.status
    ctx.body = {
      message: receivedError.message,
      example: receivedError.example,
    }
    // A return only because ESlint wanted it for consistency
    return true
  }
}

module.exports = {
  handleErrors,
}
