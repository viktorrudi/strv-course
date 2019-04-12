'use strict'

const Router = require('koa-router')
const articles = require('../controllers/articles')
const { handleErrors } = require('../middelware/errors')
const { logSuccess } = require('../middelware/logging')

const router = new Router({
  prefix: '/api/articles',
})
router.use(handleErrors)
// Logs on CRUD operations
router.use(logSuccess)

router.get('/', articles.getAll)
router.post('/', articles.create)

// Sent to app.js
module.exports = router.routes()
