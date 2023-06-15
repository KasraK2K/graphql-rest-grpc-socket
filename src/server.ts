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
/*                            Create Apollo Server                            */
/* -------------------------------------------------------------------------- */
const createApolloServer = (): ApolloServer => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  })
  logger = server.logger
  return server
}

/* -------------------------------------------------------------------------- */
/*                             Run Server Function                            */
/* -------------------------------------------------------------------------- */
// Function to run the server
const run = async (port: number) => {
  try {
    const server = createApolloServer() // Create the Apollo Server instance
    await server.start() // Start the Apollo Server

    // Set up Koa middleware and routes
    app
      .use(cors()) // Enable CORS
      .use(bodyParser()) // Parse request bodies
      .use(router.routes()) // Add RESTful routes
      .use(router.allowedMethods()) // Allow appropriate HTTP methods for routes
      .use(
        koaMiddleware(server, {
          // Connect Apollo Server middleware to Koa
          context: async ({ ctx }) => ({ token: ctx.headers.token }), // Set context for GraphQL resolvers
        })
      )

    httpServer.listen({ port }) // Start the HTTP server
  } catch (err) {
    if (err instanceof Error) {
      logger.error(`🔴 ${err.message}`)
    } else {
      logger.error(`🔴 An unknown error occurred`)
    }
  }
}

// Run the server with the specified port
run(PORT).catch((err) => logger.error(`🔴 ${err.message}`))
