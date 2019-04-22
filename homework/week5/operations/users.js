/* eslint-disable no-warning-comments */
'use strict'

const errors = require('../utils/errors')
const usersRepo = require('../repositories/users')
const log = require('../utils/logger')
const crypto = require('../utils/crypto')

// Verifies if token in header matches
async function verityTokenPayload(input) {
  const jwtPayload = await crypto.verifyAccessToken(input.jwtToken)
  const now = Date().now

  if (!jwtPayload) {
    throw new errors.AuthorizationError('AuthErr: Missing jwtPayload')
  }

  if (now >= jwtPayload.expiration * 1000) {
    throw new errors.AuthorizationError('AuthErr: now is less than payload expiration * 1000')
  }

  const userID = await parseInt(jwtPayload.userID)
  const user = await usersRepo.findById(userID)

  if (!user) {
    throw new errors.AuthorizationError('Authorization failed (couldn\'t match user)')
  }

  return {
    user,
    loginTimeout: jwtPayload.expiration * 1000,
  }
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

async function register(input) {
  log.info('Registering starting. This is what was inserted:', input)

  // Create hashed password and inserting it into the new user object
  const hashedPassword = await crypto.hashPassword(input.password)
  const user = {
    name: input.name,
    email: input.email.toLowerCase(),
    password: hashedPassword,
  }

  // Check if users email is already in database
  const alreadyExists = usersRepo.findByEmail(input.email)
  if (alreadyExists) {
    throw new errors.ConflictError('User account already exists')
  }

  // Creating user and then appending accesstoken to it
  const createdUser = usersRepo.create(user)
  createdUser.accessToken = await crypto.generateAccessToken(createdUser.id)

  // Registration end
  log.info(`New registration. Name: ${createdUser.name}, E-mail: ${createdUser.email}`)
  return createdUser
}

async function login(input) {
  log.info('Login starting. This is what was inserted', input)

  const user = await usersRepo.findByEmail(input.email.toLowerCase())
  if (!user) {
    log.error('login auth error: ', input)
    throw new errors.AuthorizationError('Incorrect username or password')
  }

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
  verityTokenPayload,
  allUsers,
  getById,
  register,
  login,
  deleteUser,
}
