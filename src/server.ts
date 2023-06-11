import Koa from 'koa'
const app = new Koa()
import router from './http/router'

const port = process.env.PORT || 3000

app
  .use(router.routes())
  .use(router.allowedMethods())
  .listen(port, () => console.log(`Server running on http://localhost:${port}`))

app.on('error', (err, ctx) => {
  console.error('server error', { err, ctx })
})
