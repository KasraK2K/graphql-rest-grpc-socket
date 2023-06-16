/* ------------------------------ Dependencies ------------------------------ */
import { Middleware, Context } from 'koa'

/* --------------------------------- Modules -------------------------------- */
import AppError from '../common/helpers/errors/AppError'
import errorFilePath from '../common/helpers/errors/errorFilePath'

const errorMiddleware: Middleware = async (ctx: Context, next) => {
  try {
    await next() // Proceed to the next middleware
  } catch (error) {
    // AppError instance error
    if (error instanceof AppError) {
      // TODO : Change this console.error to winston log
      console.error({
        message: error.message,
        statusCode: error.statusCode,
        type: 'AppError',
        ...errorFilePath(error, ctx),
      })
      ctx.body = {
        success: false,
        status: error.statusCode,
        message: error.message,
      }
    }
    // Unknown instance error
    else {
      // TODO : Change this console.error to winston log
      console.error({
        message: 'Unhandled error',
        statusCode: 500,
        type: 'Error',
        ...errorFilePath(error, ctx),
      })
      ctx.body = {
        success: false,
        status: 500,
        message: 'Unhandled error',
      }
    }
  }
}

export default errorMiddleware
