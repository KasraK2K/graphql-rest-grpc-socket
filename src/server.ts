/* ------------------------------ Dependencies ------------------------------ */
import Koa from 'koa'
import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'
/* --------------------------------- Modules -------------------------------- */
import router from './http/router'
/* -------------------------------------------------------------------------- */

const app = new Koa()
const PORT = Number(process.env.PORT) || 3000
const GRAPHQL_PORT = Number(process.env.GRAPHQL_PORT) || 4000

// The GraphQL schema
const typeDefs = `#graphql
  type Query {
    hello: String
  }
`

// A map of functions which return data for the schema.
const resolvers = {
  Query: {
    hello: () => 'world',
  },
}

/* -------------------------------------------------------------------------- */
/*                                   GraphQL                                  */
/* -------------------------------------------------------------------------- */
const server = new ApolloServer({ typeDefs, resolvers })
startStandaloneServer(server, { listen: { port: GRAPHQL_PORT } }).then(({ url }) =>
  console.log(`🟢 GraphQL Server ready at:\t ${url}`)
)

/* -------------------------------------------------------------------------- */
/*                                  REST API                                  */
/* -------------------------------------------------------------------------- */
app
  .use(router.routes())
  .use(router.allowedMethods())
  .listen(PORT, () => console.log(`🟢 Rest server ready at:\t http://localhost:${PORT}/`))

app.on('error', (err, ctx) => {
  console.error('server error', { err, ctx })
})
