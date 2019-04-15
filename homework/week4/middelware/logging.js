/* eslint-disable no-warning-comments */
/* eslint-disable node/no-unsupported-features/es-syntax */
'use strict'

const log = require('../utils/logger')

async function logSuccess(ctx, next) {
  try {
    log.info(`${ctx.method} REQUEST @ ${ctx.protocol}://${ctx.host}${ctx.originalUrl}
    ${ctx.body}`)
    return await next()
  } catch (err) {
    // Todo: Update with a 500 error (need to make in utils/errors)
    throw new Error('what')
  }
}

module.exports = {
  logSuccess,
}
