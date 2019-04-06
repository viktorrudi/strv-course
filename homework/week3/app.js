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
  // Loggin response TO-DO: PUT INTO FILE
  logger.info(`
  ${ctx.method} REQUEST @ ${ctx.protocol}://${ctx.host}${ctx.originalUrl} 
  ${moment().format()}`)
  // Get response
  ctx.response.body = articles
})

// Get single article
router.get('/api/articles/:id', ctx => {
  const getID = ctx.params.id - 1
  const found = articles.length > getID

  if (found) {
  // Logging response TO-DO: PUT INTO FILE
    logger.info(`
    ${ctx.method} REQUEST @ ${ctx.protocol}://${ctx.host}${ctx.originalUrl} 
    ${moment().format()}`)

    ctx.response.body = articles[getID]
  } else {
    ctx.throw(400, 'Couldn\'t find article')
  }
})

// Create member
router.post('/api/articles', ctx => {
  const newArticle = {
    id: articles.length + 1,
    title: ctx.request.body.title,
    text: ctx.request.body.text,
    author: ctx.request.body.author,
  }

  if (!newArticle.title || !newArticle.text || !newArticle.author) {
    return ctx.throw(400, 'Title, author and text is required')
  }

  articles.push(newArticle)

  // Logging response TO-DO: PUT INTO FILE
  logger.info(`
  ${ctx.method} REQUEST @ ${ctx.protocol}://${ctx.host}${ctx.originalUrl} 
  ${moment().format()}`)
  // Give a response with added article
  ctx.body = newArticle
})

// Update article
router.put('/api/articles/:id', ctx => {
  const getID = ctx.params.id - 1
  const found = articles.length > getID

  if (found) {
  // Logging response TO-DO: PUT INTO FILE
    logger.info(`
    ${ctx.method} REQUEST @ ${ctx.protocol}://${ctx.host}${ctx.originalUrl} 
    ${moment().format()}`)

    const updArticle = ctx.request.body
    articles.forEach(article => {

      if (article.id === ctx.params.id) {
        article.title = updArticle.title ? updArticle.title : article.title
        article.text = updArticle.text ? updArticle.text : article.text
        article.author = updArticle.author ? updArticle.author : article.author

        ctx.response.body = {
          updated: articles[getID]
        }
      }
    })
  }
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
