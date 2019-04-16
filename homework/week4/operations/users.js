/* eslint-disable node/no-unsupported-features/es-syntax */
/* eslint-disable no-warning-comments */
'use strict'

const errors = require('../utils/errors')
const usersRepo = require('../repositories/users')
const log = require('../utils/logger')
const crypto = require('../utils/crypto')

function verityToken(input) {
  // TODO: MIDDELWARE: Veritication middleware
  // TODO: UTIL: Create crypto util to use for veritication
}

function allUsers() {
  return usersRepo.findAll()
}

function getById(id) {
  const user = usersRepo.getById(id)
  if (!user) {
    throw new errors.NotFoundError('No user with this ID')
  }

  // Returns user with matching ID
  return user
}

function register(input) {
  log.info('Registering starting. This is what was inserted', input)

  // TODO: Make crypto a promise so I can await all crypto FNs
  const user = {
    name: input.name,
    email: input.email.toLowerCase(),
    password: crypto.hashPassword(input.password),
  }

  const alreadyExists = usersRepo.findByEmail(input.email)
  if (alreadyExists) {
    // TODO: Update with a better error. Conflict error (utils)
    throw new errors.ValidationError('Already exists')
  }

  const createdUser = usersRepo.create(user)
  createdUser.accessToken = crypto.generateAccessToken(createdUser.id)
  log.info('Registering successful of', createdUser.email)

  return createdUser
}

async function login(input) {
  log.info('Login starting. This is what was inserted', input)

  const user = await usersRepo.findByEmail(input.email.toLowerCase())
  if (!user) {
    log.error('login auth error: ', input)
    throw new errors.AuthorizationError('Incorrect username or password')
  }

  // Testing
  log.info('database:', user.password)
  log.info('POSTed:', input.password)

  const verified = await crypto.comparePasswords(input.password, user.password)
  if (!verified) {
    log.error('login auth error not verified: ', input)
    throw new errors.AuthorizationError('Not verified')
  }
  // If user is found, and password compared was successful, create accesstoken and return it
  const accessToken = await crypto.generateAccessToken(user.id)
  log.info('Login successful!!')
  return {
    message: 'Vertification successful',
    userInfo: {
      id: user.id,
      email: user.email,
      accessToken,
    },
  }
}

function deleteUser(id) {
  const user = usersRepo.deleteUser(id)
  if (!user) {
    throw new errors.NotFoundError('User to delete not found')
  }
  return user
}

module.exports = {
  verityToken,
  allUsers,
  getById,
  register,
  login,
  deleteUser,
}
