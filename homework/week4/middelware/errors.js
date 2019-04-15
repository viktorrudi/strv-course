/* eslint-disable node/no-unsupported-features/es-syntax */
'use strict'

// Triggered in routes
async function handleErrors(ctx, next) {
  try {
    // If no errors, continue to next middleware
    return await next()
  } catch (err) {
    // Set response status code and body message
    ctx.status = err.status
    ctx.body = {
      message: err.message,
      example: err.example,
    }
    // [QUESTION] Is this return just to make ESLint shut up?
    return true
  }
}

module.exports = {
  handleErrors,
}
