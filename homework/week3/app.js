const Koa = require('koa')
const KoaRouter = require('koa-router')

const app = new Koa();
const router = new KoaRouter();

// Simple middleware creation
app.use(async ctx => {
  ctx.body = 'Hello world'
})

router.get('/path', ctx => {
  ctx.body = 'path here'
})

// Router middleware
app.use(router.routes()).use(router.allowedMethods())

app.listen(5000, ()=> console.log('server started'))