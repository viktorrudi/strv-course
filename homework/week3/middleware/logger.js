'use strict'

const moment = require('moment')

const logger = ctx => {
  if(ctx.method) {
    logger.info(`
      ${ctx.method} REQUEST @ 
      ${ctx.protocol}://${ctx.host}${ctx.originalUrl} 
      at ${moment().format()}
    `)
  }
}

module.exports = logger