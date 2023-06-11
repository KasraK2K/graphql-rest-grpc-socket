/* ------------------------------ Dependencies ------------------------------ */
import Koa from 'koa'
import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'
/* --------------------------------- Modules -------------------------------- */
import router from './restful/router'
import resolvers from './graphql/resolvers'
import typeDefs from './graphql/typeDefs'

/* -------------------------------- Constants ------------------------------- */
const app = new Koa()
const eventEmitter = new Koa.EventEmitter()
const PORT = Number(process.env.PORT) || 3000
const GRAPHQL_PORT = Number(process.env.GRAPHQL_PORT) || 4000

/* --------------------------------- GraphQL -------------------------------- */
const registerGraphQL = (port: number) => {
  const server = new ApolloServer({ typeDefs, resolvers })
  startStandaloneServer(server, { listen: { port } }).then(({ url }) =>
    console.log(`🧩 GraphQL Server ready at:\t ${url}`)
  )
}
registerGraphQL(GRAPHQL_PORT)

/* -------------------------------- REST API -------------------------------- */
app
  .use(router.routes())
  .use(router.allowedMethods())
  .listen(PORT)
  .on('listening', () => eventEmitter.emit('start'))
  .on('connection', (stream) => console.log('connection'))
  .on('request', (stream) => console.log('request'))
  .on('error', (stream) => console.error('server error'))

eventEmitter.on('start', () => console.log(`🧩 Rest server ready at:\t http://localhost:${PORT}/`))
