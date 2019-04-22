'use strict'

module.exports = {
  server: {
    port: process.env.PORT || 3000,
  },
  auth: {
    secret: 'Secret code',
    saltRounds: 10,
    verifyOptions: {
      algorithm: 'HS256',
      issuer: 'Viktor',
    },
    createOptions: {
      expiresIn: 60 * 60,
      algorithm: 'HS256',
      issuer: 'Viktor',
    },
  },
  db: {
    uri: process.env.DB_URI || 'postgresql://postgres@localhost:5432/vrudi',
  },
}

