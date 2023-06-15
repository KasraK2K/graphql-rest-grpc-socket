/* ------------------------------ Dependencies ------------------------------ */
import http from 'node:http'
import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import cors from '@koa/cors'
import { ApolloServer } from '@apollo/server'
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'
import { koaMiddleware } from '@as-integrations/koa'
import { Logger } from '@apollo/utils.logger'
/* --------------------------------- Modules -------------------------------- */
import router from './restful/router'
import resolvers from './graphql/resolvers'
import typeDefs from './graphql/typeDefs'

/* -------------------------------- Constants ------------------------------- */
const app = new Koa()
const httpServer = http.createServer(app.callback())

const PORT = Number(process.env.PORT) || 3000
let logger: Logger

httpServer
  .on('listening', () => {
    logger.info(`🧩 Rest server ready at:\t http://localhost:${PORT}/`)
    logger.info(`🧩 GraphQL Server ready at:\t http://localhost:${PORT}/graphql/`)
  })
  .on('connection', (): void => console.log('connection'))
  .on('request', (): void => console.log('request'))
  .on('error', (): void => console.error('server error'))

/* -------------------------------------------------------------------------- */
/*                             Run Server Function                            */
/* -------------------------------------------------------------------------- */
const run = async (port: number) => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  })
  logger = server.logger
  await server.start()

  app
    .use(cors())
    .use(bodyParser())
    .use(router.routes())
    .use(router.allowedMethods())
    .use(koaMiddleware(server, { context: async ({ ctx }) => ({ token: ctx.headers.token }) }))

  Promise.resolve()
    .then(() => httpServer.listen({ port }))
    .then(() => {})
    .catch((err) => logger.error(`🔴 ${err.message}`))
}
run(PORT)
