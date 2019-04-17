/* eslint-disable no-warning-comments */
'use strict'

const Router = require('koa-router')
const articles = require('../controllers/articles')
const users = require('../controllers/users')
const { handleErrors } = require('../middelware/errors')
const { logSuccess } = require('../middelware/logging')

const router = new Router({
  prefix: '/api/articles',
})
router.use(handleErrors)
// Logs on CRUD operations
router.use(logSuccess)

// TODO: Create better routes for users. Different router with prefix for users maybe?

// Users
router.get('/users', users.allUsers)
router.post('/users', users.login)
router.post('/register', users.register)

// Articles
router.get('/', articles.getAll)
router.get('/:id', articles.getById)
router.post('/', articles.create)
router.put('/:id', articles.put)
router.patch('/:id', articles.patch)
router.delete('/:id', articles.deleteArticle)

// Sent to app.js
module.exports = router.routes()
