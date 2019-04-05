'use strict'

// Packages
const Koa = require('koa')
const KoaRouter = require('koa-router')
const bodyParser = require('koa-body-parser')
const json = require('koa-json')
const pino = require('pino')
const moment = require('moment')

// Logging - prettify
const logger = pino({ prettyPrint: true })


// App and router setup
const app = new Koa()
const router = new KoaRouter()
const articles = require('./Articles')

// Trigger middlewares
app.use(json())
app.use(bodyParser())
app.use(router.routes())
// app.use(router.routes()).use(router.allowedMethods())

// ---------------------------------------------------------------------


// Get all articles
router.get('/api/articles', ctx => {

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
router.get('/api/articles/:id', ctx => {
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

// Create member
router.post('/api/articles', ctx => {

  const newArticle = {
    title: ctx.request.body.title,
    text: ctx.request.body.text,
  }

  if (!newArticle.title || !newArticle.text) {
    return ctx.throw(400, 'Title and text is required')
  }

  articles.push(newArticle)

  // Give a response with added article
  ctx.body = newArticle

})

// ---------------------------------------------------------------------

// Server setup
const PORT = 5000
const server = app.listen(5000, () => {
  logger.info(`Server started on port ${PORT}`)
})

// Closing server (on 'Ctrl+C')
process.on('SIGINT', () => {
  server.close(() => {
    logger.info('Server closing')
  })
  setTimeout(() => {
    throw new Error('Timed out and disconnected')
  }, 5000)
})
