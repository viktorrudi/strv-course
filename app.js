'use strict'

// Packages
const Koa = require('koa')
const KoaRouter = require('koa-router')
const bodyParser = require('koa-body-parser')
const json = require('koa-json')
const pino = require('pino')
const moment = require('moment')
const uuid = require('uuid')

// Pino prettifier
const logger = pino({
  prettyPrint: true,
})

// App, router setup and import of "db" (global array)
const app = new Koa()
const router = new KoaRouter({
  prefix: '/api/articles',
})
const articles = require('./Articles')

// Trigger middlewares
app.use(json())
app.use(bodyParser())
app.use(router.routes())

// ---------------------------------------------------------------------

// Get all articles
router.get('/', ctx => {
  // Loggin response TO-DO: PUT INTO FILE
  logger.info(`
  ${ctx.method} REQUEST @ ${ctx.protocol}://${ctx.host}${ctx.originalUrl} 
  ${moment().format()}`)
  // Get response
  ctx.response.body = articles
})

// Get single article
router.get('/:id', ctx => {
  const getID = ctx.params.id - 1
  const found = articles.length > getID

  if (found) {
    // Logging response TO-DO: PUT INTO FILE
    logger.info(`
    ${ctx.method} REQUEST @ ${ctx.protocol}://${ctx.host}${ctx.originalUrl} 
    ${moment().format()}`)

    ctx.response.body = articles[getID]
  } else {
    ctx.throw(400, "Couldn't find article")
  }
})

// Create article
router.post('/', ctx => {
  const newArticle = {
    id: uuid.v4(),
    title: ctx.request.body.title,
    text: ctx.request.body.text,
    author: ctx.request.body.author,
  }

  if (!newArticle.title || !newArticle.text || !newArticle.author) {
    ctx.throw(400, 'Title, author and text is required')
  }

  // Insert new article into all articles
  articles.push(newArticle)

  // Logging response TO-DO: PUT INTO FILE
  logger.info(`
  ${ctx.method} REQUEST @ ${ctx.protocol}://${ctx.host}${ctx.originalUrl} 
  ${moment().format()}`)

  // Give a response with added article
  ctx.body = newArticle
})

// Update (patch) article
router.patch('/:id', ctx => {
  const getID = ctx.params.id - 1
  const found = articles.length > getID

  // testing
  ctx.response.body = articles

  if (found) {
    // Logging response TO-DO: PUT INTO FILE
    logger.info(`
    ${ctx.method} REQUEST @ ${ctx.protocol}://${ctx.host}${ctx.originalUrl} 
    ${moment().format()}`)

    const updArticle = ctx.request.body
    articles.forEach((article, index) => {
      const currentIndex = parseInt(JSON.stringify(index)) + 1
      const parameterID = parseInt(ctx.params.id)

      if (currentIndex === parameterID) {
        article.title = updArticle.title ? updArticle.title : article.title
        article.text = updArticle.text ? updArticle.text : article.text
        article.author = updArticle.author ? updArticle.author : article.author

        ctx.response.body = {
          'updated article': articles[getID],
        }
      }
    })
  } else {
    ctx.throw(400, "Couldn't find article to update")
  }
})

// Delete article
router.delete('/:id', ctx => {
  const getID = ctx.params.id - 1
  const found = articles.length > getID

  if (found) {
    ctx.body = {
      'removed article': articles[getID],
    }
    articles.splice(getID, 1)
  } else {
    ctx.throw(400, "Couldn't find article to delete")
  }
})

// ---------------------------------------------------------------------

// Server setup
const PORT = process.env.PORT || 5000
const server = app.listen(PORT, () => {
  logger.info(`Server started on port ${PORT}`)
})

// Closing server (on 'Ctrl+C')
process.on('SIGINT', () => {
  server.close(() => {
    logger.info('Server closing')
  })
  setTimeout(() => {
    throw new Error('Timed out and disconnected')
  }, 5000).unref()
})
