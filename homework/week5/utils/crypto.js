/* eslint-disable no-warning-comments */

'use strict'

const util = require('util')
const crypto = require('crypto')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const config = require('../config/default')

// Make signing and verifying of the json webtoken into a promise
const jwtSign = util.promisify(jwt.sign)
const jwtVerify = util.promisify(jwt.verify)

async function generateAccessToken(userID) {
  const payload = await { userID }
  return jwtSign(payload, config.auth.secret, config.auth.createOptions)
}

function verifyAccessToken(authToken) {
  try {
    return jwtVerify(authToken, config.auth.secret, config.auth.verifyOptions)
  } catch (error) {
    throw error
  }
}

function hashPassword(password) {
  return bcrypt.hash(pepperify(password), config.auth.saltRounds)
}

function comparePasswords(plainText, cipher) {
  return bcrypt.compare(pepperify(plainText), cipher)
}

module.exports = {
  generateAccessToken,
  verifyAccessToken,
  hashPassword,
  comparePasswords,
}

// Only used in this file, to hash the password
function pepperify(string) {
  return crypto
    .createHmac('sha1', config.auth.secret)
    .update(string)
    .digest('hex')
}
