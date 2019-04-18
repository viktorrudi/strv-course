/* eslint-disable no-warning-comments */
'use strict'

const Router = require('koa-router')
const articles = require('../controllers/articles')
const users = require('../controllers/users')
const { handleErrors } = require('../middelware/errors')
const { logSuccess } = require('../middelware/logging')
const { auth } = require('../middelware/auth')

const router = new Router()
router.use(handleErrors)
// Logs on CRUD operations
router.use(logSuccess)

// TODO: Create better routes for users. Different router with prefix for users maybe?

// Users
router.get('/api/users', users.allUsers)
router.post('/api/login', users.login)
router.post('/api/register', users.register)

// Articles (Protected routes)
router.get('/api/articles/', auth, articles.getAll)
router.get('/api/articles/:id', auth, articles.getById)
router.post('/api/articles/', auth, articles.create)
router.put('/api/articles/:id', auth, articles.put)
router.patch('/api/articles/:id', auth, articles.patch)
router.delete('/api/articles/:id', auth, articles.deleteArticle)

// Sent to app.js
module.exports = router.routes()
