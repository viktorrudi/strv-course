const Koa = require('koa')
const KoaRouter = require('koa-router')
const path = require('path')
// const render = require('koa-ejs')

const app = new Koa();
const router = new KoaRouter();

// ?
// render(app, {
//   root: path.join(__dirname, 'views'),
//   layout: 'layout',
//   viewExt: 'html',
//   cache: false,
//   debug: false
// })


// Simple middleware creation
app.use(async ctx => {
  ctx.body = 'Hello world'
})

// Not working?
router.get('/test', ctx => {
  ctx.body = 'test here'
})

// Router middleware
app.use(router.routes()).use(router.allowedMethods())

app.listen(5000, ()=> console.log('server started'))