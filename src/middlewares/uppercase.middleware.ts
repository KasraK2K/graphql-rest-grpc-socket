/* ------------------------------ Dependencies ------------------------------ */
import { GraphQLArgs, GraphQLResolveInfo } from 'graphql'
/* ----------------------------- Custom Modules ----------------------------- */
import { IContext } from '../graphql/context'
/* -------------------------------------------------------------------------- */

const uppercaseMiddleware = async (
  resolve: (...args: any[]) => any, // Resolve return value of field
  parent: any,
  args: GraphQLArgs,
  context: IContext,
  info: GraphQLResolveInfo
) => {
  const result = await resolve(parent, args, context, info)
  return result.toUpperCase()
}

export default uppercaseMiddleware
