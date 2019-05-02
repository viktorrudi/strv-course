'use strict'

require('dotenv').config()

module.exports = {
  server: {
    port: process.env.PORT || 3000,
  },
  auth: {
    secret: 'Secret code to use for salt',
    saltRounds: 10,
    verifyOptions: {
      algorithm: 'HS256',
      issuer: 'Viktor',
    },
    createOptions: {
      // 1 hour
      expiresIn: 60 * 60,
      algorithm: 'HS256',
      issuer: 'Viktor',
    },
  },
  db: {
    // Not used here. Fetched with dotenv (.env)
    uri: process.env.DB_CONNECTION || 'postgresql://docker:docker@localhost:5432/vrudi',
  },
}

