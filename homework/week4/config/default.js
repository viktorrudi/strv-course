'use strict'

module.exports = env => ({
  env,
  server: {
    port: process.env.PORT || 3000,
  },
})

