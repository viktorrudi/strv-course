'use strict'

// Packages
const Koa = require('koa')
const KoaRouter = require('koa-router')
const bodyParser = require('koa-body-parser')
const json = require('koa-json')
// Logging - setup
const pino = require('pino')

const logger = pino({ prettyPrint: true })

// App and router setup
const app = new Koa()
const router = new KoaRouter()

// Trigger middlewares
app.use(json())
app.use(bodyParser())
app.use(router.routes())
// app.use(router.routes()).use(router.allowedMethods())


// Api functionality (should be moved to other folder)
router.get('/:id/:name', ctx => {
  // Better logging in console
  logger.info('test')

  // Custom header
  ctx.response.set('STRV-custom-header', 'Some test information')

  // Get response
  ctx.response.body = {
    id: ctx.params.id,
    name: ctx.params.name,
  }
})

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
  // process.exit() - AVOID THIS COMMAND. Instead throw error if server cant close in 10 seconds:
  setTimeout(() => {
    throw new Error('Timed out and disconnected')
  }, 1000)
})
