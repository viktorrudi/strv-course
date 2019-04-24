/* eslint-disable no-console */
'use strict'

const Koa = require('koa')
const bodyParser = require('koa-body')
// const json = require('json')
const routes = require('./routes/index')
const config = require('./config/default')
const log = require('./utils/logger')
const database = require('./database')

// Advanced. To be removed. Commented where its used below.
// const services = {
//   server: null,
// }

// App setup
const app = new Koa()

// Initialize routes
app.use(bodyParser())
app.use(routes)

app.start = async () => {
  log.info('Starting app')

  await database.start()
  // services.server = await new Promise((res, reject) => {
  //   const listen = app.listen(config.server.port, err => err ? reject(err) : res(listen))
  // })
}

// [QUESTION] What does 'require' and 'module' do here?
if (require.main === module) {
  app.start()
    .then(() => log.info('App running'))
    .catch(error => log.error(error))
}

// const PORT = config.server.port
// const server = app.listen(PORT, () => {
//   log.info(`Server online on ${PORT}`)
// })

process.once('SIGINT', () => app.stop(() => log.info('Shutting down')))
process.once('SIGTERM', () => app.stop(() => log.info('Shutting down')))

module.exports = app
