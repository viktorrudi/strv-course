'use strict'

// Packages
const Koa = require('koa')
const bodyParser = require('koa-body-parser')
const json = require('koa-json')
const routes = require('./routes')
const config = require('./config')
const log = require('./logger')

// App, router setup and import of "db" (global array)
const app = new Koa()


// Trigger middlewares
app.use(json())
app.use(bodyParser())
app.use(routes)


// Server setup
const PORT = config().server.port || 3000
const server = app.listen(PORT, () => {
  log.info(`Server started on port ${PORT}`)
})

// Closing server (on 'Ctrl+C')
process.on('SIGINT', () => {
  server.close(() => {
    log.info('Server closing')
  })
  setTimeout(() => {
    throw new Error('Timed out and disconnected')
  }, 5000).unref()
})
