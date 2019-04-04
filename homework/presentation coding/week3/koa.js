'use strict';

const Koa = require('koa')
const bodyparser = require('koa-bodyparser')
const Router = require('koa-router')

const router = new Router()
const koa = new Koa()

router.get('/', ctx => {
  ctx.response.body = {
    hello: 'world'
  }
})
router.get('/articles/:id', ctx => {
  ctx.response.body = {
    // Get ID from params:
    id: ctx.params.id
  }
})

koa.use(bodyparser())
koa.use(router.routes())

const server = koa.listen(3000)

process.on('SIGINT',()=>{
  // When using Ctrl + C to stop server
  server.close()
})