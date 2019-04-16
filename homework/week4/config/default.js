'use strict'

module.exports = env => ({
  env,
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
})

