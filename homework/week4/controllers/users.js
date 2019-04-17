/* eslint-disable no-warning-comments */
/* eslint-disable node/no-unsupported-features/es-syntax */
'use strict'

const operations = require('../operations/users')
const schemas = require('../validations/schemas/users')
const { validate } = require('../validations/index')

async function allUsers(ctx) {
  ctx.body = await operations.allUsers()
}

async function login(ctx) {
  const input = {
    email: ctx.request.body.email,
    password: ctx.request.body.password,
  }
  validate(schemas.userLogin, input)
  ctx.body = await operations.login(input)
}

async function register(ctx) {
  const input = {
    name: ctx.request.body.name,
    email: ctx.request.body.email,
    password: ctx.request.body.password,
  }
  validate(schemas.userSignup, input)

  // If validation succesful, run functions to create user and send it back
  const newUser = await operations.register(input)
  ctx.body = newUser
}

module.exports = {
  login,
  register,
  allUsers,
}
