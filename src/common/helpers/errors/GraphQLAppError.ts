import { GraphQLError, GraphQLErrorExtensions, GraphQLResolveInfo } from 'graphql'

class GraphQLAppError extends GraphQLError {
  extensions: GraphQLErrorExtensions

  constructor(info: GraphQLResolveInfo, statusCode: number, message: string) {
    super(message)

    const { path } = info
    this.extensions = {
      statusCode,
      path,
    }
  }
}

export default GraphQLAppError
