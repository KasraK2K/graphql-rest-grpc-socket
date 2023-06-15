import Router from '@koa/router'
const router = new Router()

router.get('/', (ctx): void => {
  ctx.body = { message: 'Hello World' }
})

export default router
