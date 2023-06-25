/* ------------------------------ Dependencies ------------------------------ */
import { GraphQLError, GraphQLErrorExtensions } from 'graphql'
/* -------------------------------------------------------------------------- */

class GraphQLAppError extends GraphQLError {
  extensions: GraphQLErrorExtensions

  constructor(statusCode: number, message: string) {
    super(message)

    this.extensions = {
      statusCode,
      path: undefined,
    }
  }
}

export default GraphQLAppError
