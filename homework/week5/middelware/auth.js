'use strict'

const error = require('../utils/errors')
const { validate } = require('../validations/index')
const schemas = require('../validations/schemas/users')
const operations = require('../operations/users')

async function auth(ctx, next) {
  const authToken = ctx.header.auth

  if (!authToken) {
    throw new error.AuthorizationError('Authorization failed. Check auth token')
  }
  // testing

  const input = { jwtToken: authToken }
  validate(schemas.jwtToken, input)

  const data = await operations.verityTokenPayload(input)

  if (ctx.response && data.loginTimeout) {
    ctx.set('Login-timeout', data.loginTimeout)
  }



  ctx.state.user = data.user
  return next()
}

module.exports = {
  auth,
}
