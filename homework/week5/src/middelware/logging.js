/* eslint-disable no-warning-comments */
/* eslint-disable node/no-unsupported-features/es-syntax */
'use strict'

const log = require('../utils/logger')

async function logSuccess(ctx, next) {
  log.info(`${ctx.method} REQUEST @ ${ctx.protocol}://${ctx.host}${ctx.originalUrl}
    ${ctx.body}`)
  return await next()
}

module.exports = {
  logSuccess,
}
