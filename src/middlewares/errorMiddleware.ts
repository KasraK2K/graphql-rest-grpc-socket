import { Middleware, Context } from 'koa'
import AppError from '../common/helpers/errors/AppError'

const errorMiddleware: Middleware = async (ctx: Context, next) => {
  try {
    await next() // Proceed to the next middleware
  } catch (error) {
    // AppError instance error
    if (error instanceof AppError) {
      console.error({ message: error.message, statusCode: error.statusCode, type: 'AppError' })
      ctx.body = {
        success: false,
        status: error.statusCode,
        message: error.message,
      }
    }
    // Unknown error
    else {
      console.error({ message: 'Unhandled error', statusCode: 500, type: 'Error' })
      ctx.body = {
        success: false,
        status: 500,
        message: 'Unhandled error',
      }
    }
  }
}

export default errorMiddleware
