/* ------------------------------ Dependencies ------------------------------ */
// import http from 'node:http'
import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import cors from '@koa/cors'

/* --------------------------------- Modules -------------------------------- */
import router from './restful/router'
import errorMiddleware from './middlewares/errorMiddleware'
import AppError from './common/helpers/errors/AppError'

/* -------------------------------- Constants ------------------------------- */
const app = new Koa()
// const httpServer = http.createServer(app.callback())

const PORT = Number(process.env.PORT) || 3000

// `Set up Koa middleware and routes
app
  .use(async (ctx, next) => {
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
        // TODO : Change this console.error to winston log
        console.error({ message: error.message, statusCode: 500, type: 'ServerError' })
      } else {
        ctx.body = {
          success: false,
          status: 500,
          message: 'An unknown error occurred at errorMiddleware',
        }
        // TODO : Change this console.error to winston log
        console.error({
          message: 'An unknown error occurred at errorMiddleware',
          statusCode: 500,
          type: 'ServerError',
        })
      }
    }
  }) // Error Handler
  .use(
    cors({
      origin: (ctx) => {
        // TODO : Fill `blockDomains` array using Redis for block how doesn't have enough license
        const blockDomains: string[] = ['http://localhost:5000']
        const blockMethods: string[] = []
        const isBlocked = blockDomains.some((domainAddress) => ctx.origin.includes(domainAddress))
        const isBlockedMethod = blockMethods.some((method) => ctx.method.includes(method))
        if (isBlocked) throw new AppError('Forbidden', 403)
        else if (isBlockedMethod) throw new AppError('Method Not Allowed', 405)
        else return ctx.origin
      },
    })
  ) // Enable CORS
  .use(bodyParser()) // Parse request bodies
  .use(router.routes()) // Add RESTful routes
  .use(router.allowedMethods()) // Allow appropriate HTTP methods for routes

app.on('error', (err: Error | AppError): void => {
  // TODO : Change this console.error to winston log
  console.error('🔴 Error event raised')
  console.warn(err.stack)
})

/* -------------------------------------------------------------------------- */
/*                            Create Apollo Server                            */
/* -------------------------------------------------------------------------- */
// TODO : GraphQL Implementation

/* -------------------------------------------------------------------------- */
/*                             Run Server Function                            */
/* -------------------------------------------------------------------------- */
// Function to run the server
const run = async (port: number) => {
  try {
    app.listen({ port }) // Start the HTTP server
  } catch (err) {
    if (err instanceof Error) {
      console.error(`🔴 ${err.message}`)
    } else {
      console.error(`🔴 An unknown error occurred`)
      console.assert(err)
    }
  }
}

// Run the server with the specified port
run(PORT)
  .then(() => {
    console.info(`🧩 Rest server ready at:\t http://localhost:${PORT}/`)
    // console.info(`🧩 GraphQL Server ready at:\t http://localhost:${PORT}/graphql/`)
  })
  .catch((err) => console.error(`🔴 ${err.message}`))
