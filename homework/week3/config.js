'use strict'

const config = env => ({
  env,
  server: {
    port: process.env.PORT,
  },
})

module.exports = config
