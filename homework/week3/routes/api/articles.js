'use strict';

const Koa = require('koa')
const KoaRouter = require('koa-router')
const articles = require('../../Articles')

const router = new KoaRouter()

// Get all articles
router.get('/', ctx => {

  // Loggin response  TO-DO: PUT INTO FILE
  logger.info(`
    ${ctx.method} REQUEST @ 
    ${ctx.protocol}://${ctx.host}${ctx.originalUrl} 
    at ${moment().format()}
  `)

  // Get response
  ctx.response.body = articles
})

// Get single article
router.get('/:id', ctx => {

  const getID = ctx.params.id - 1
  const found = articles.length > getID

  if (found) {
    // Loggin response TO-DO: PUT INTO FILE
    logger.info(`
      ${ctx.method} REQUEST @ 
      ${ctx.protocol}://${ctx.host}${ctx.originalUrl} 
      at ${moment().format()}
      ${found}
    `)

    ctx.response.body = articles[getID]
  } else {
    ctx.throw(400, 'Couldn\'t find article')
  }
})

module.exports = router