import Router from '@koa/router'
import NotFoundError from '../../common/helpers/errors/NotFoundError'
const router = new Router()

router.get('/', (ctx): void => {
  ctx.body = { message: 'Hello World' }
  myError()
})

function myError() {
  B()
}

function B() {
  throw new NotFoundError('Error happened when getting root path')
}

export default router
