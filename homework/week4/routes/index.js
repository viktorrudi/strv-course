'use strict'

const Router = require('koa-router')
const articles = require('../controllers/articles')

const router = new Router({
  prefix: '/api/articles',
})

router.get('/', articles.getAll)
router.post('/', articles.create)

module.exports = router.routes()
