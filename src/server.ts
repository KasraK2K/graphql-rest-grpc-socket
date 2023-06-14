/* ------------------------------ Dependencies ------------------------------ */
import Koa from 'koa'
import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'
/* --------------------------------- Modules -------------------------------- */
import router from './restful/router'
import resolvers from './graphql/resolvers'
import typeDefs from './graphql/typeDefs'
import { Logger } from '@apollo/utils.logger'

/* -------------------------------- Constants ------------------------------- */
const app = new Koa()
const PORT = Number(process.env.PORT) || 3000
const GRAPHQL_PORT = Number(process.env.GRAPHQL_PORT) || 4000

let logger: Logger
/* --------------------------------- GraphQL -------------------------------- */
const registerGraphQL = (port: number) => {
  const server = new ApolloServer({ typeDefs, resolvers })
  // const { logger /* , cache */ } = server
  logger = server.logger

  startStandaloneServer(server, { listen: { port } }).then(({ url }) =>
    logger.info(`🧩 GraphQL Server ready at:\t ${url}`)
  )
}
registerGraphQL(GRAPHQL_PORT)

/* -------------------------------- REST API -------------------------------- */

app
  .use(router.routes())
  .use(router.allowedMethods())
  .listen(PORT)
  .on('listening', () => logger.info(`🧩 Rest server ready at:\t http://localhost:${PORT}/`))
  .on('connection', (stream): void => console.log('connection', stream))
  .on('request', (stream): void => console.log('request', stream))
  .on('error', (stream): void => console.error('server error', stream))
