/* ------------------------------ Dependencies ------------------------------ */
import { GraphQLArgs, GraphQLResolveInfo } from 'graphql'
/* ----------------------------- Custom Modules ----------------------------- */
import { IContext } from '../graphql/context'
/* -------------------------------------------------------------------------- */

const logResultMiddleware = async (
  resolve: (...args: any[]) => any,
  parent: any,
  args: GraphQLArgs,
  context: IContext,
  info: GraphQLResolveInfo
) => {
  const result = await resolve(parent, args, context, info)
  console.log('Log Result Middleware:', result)
  return result
}

export default logResultMiddleware
