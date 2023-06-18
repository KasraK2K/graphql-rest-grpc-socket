/* ------------------------------ Dependencies ------------------------------ */
import Koa from 'koa'
import chalk from 'chalk'
import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'
import { Logger } from '@apollo/utils.logger'
import { makeExecutableSchema } from '@graphql-tools/schema'

/* --------------------------------- Modules -------------------------------- */
import resolvers from './graphql/resolvers'
import typeDefs from './graphql/typeDefs'
import errorMiddleware from './middlewares/errorMiddleware'
import AppError from './common/helpers/errors/AppError'
import { context } from './graphql/context'

/* -------------------------------- Constants ------------------------------- */
const app = new Koa()

const PORT = Number(process.env.PORT) || 3000
let logger: Logger
const gqlStyle = chalk.hex('#f6009b')
const errStyle = chalk.hex('#FF0000').bold
const warnStyle = chalk.hex('#FFFF00').bold
const successStyle = chalk.hex('#00FF00')

app.use(async (ctx, next) => {
  try {
    await errorMiddleware(ctx, next)
  } catch (error) {
    // If `errorMiddleware` has error
    if (error instanceof Error) {
      ctx.body = {
        success: false,
        status: 500,
        message: error.message,
      }
      // TODO : Change this logger.error to winston log
      logger.error({ message: error.message, statusCode: 500, type: 'ServerError' })
    } else {
      ctx.body = {
        success: false,
        status: 500,
        message: 'An unknown error occurred at errorMiddleware',
      }
      // TODO : Change this logger.error to winston log
      logger.error({
        message: 'An unknown error occurred at errorMiddleware',
        statusCode: 500,
        type: 'ServerError',
      })
    }
  }
})

app.on('error', (err: Error | AppError): void => {
  // TODO : Change this logger.error to winston log
  logger.error('🔴 Error event raised')
  logger.warn(err.stack)
})

/* -------------------------------------------------------------------------- */
/*                            Create Apollo Server                            */
/* -------------------------------------------------------------------------- */
const createApolloServer = (): ApolloServer => {
  const server = new ApolloServer({
    schema: makeExecutableSchema({ typeDefs, resolvers }),
    includeStacktraceInErrorResponses: true,
  })
  logger = server.logger
  return server
}

/* -------------------------------------------------------------------------- */
/*                             Run Server Function                            */
/* -------------------------------------------------------------------------- */
// Function to run the server
const run = (port: number) => {
  const server = createApolloServer() // Create the Apollo Server instance
  // await server.start() // Start the Apollo Server

  startStandaloneServer(server, {
    context: async () => context,
    listen: { port },
  })
    .then(({ url }) => {
      logger.info(`${gqlStyle('GraphQL')} server ready at: ${gqlStyle.underline(url)}`)
    })
    .catch((err) => {
      if (err instanceof Error) {
        logger.error(errStyle(`🔴 ${err.message}`))
      } else {
        logger.error(`🔴 An unknown error occurred`)
        console.assert(err)
      }
    })
}

run(PORT) // Run the server with the specified port
