/* ------------------------------ Dependencies ------------------------------ */
import { GraphQLArgs, GraphQLResolveInfo } from 'graphql'
/* ----------------------------- Custom Modules ----------------------------- */
import { IContext } from './context'
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/*                            Middleware Functions                            */
/* -------------------------------------------------------------------------- */
const logInput = async (
  resolve: (...args: any[]) => any,
  parent: any,
  args: GraphQLArgs,
  context: IContext,
  info: GraphQLResolveInfo
) => {
  console.log('logInput:', { args })
  return await resolve(parent, args, context, info)
}

const logResult = async (
  resolve: (...args: any[]) => any,
  parent: any,
  args: GraphQLArgs,
  context: IContext,
  info: GraphQLResolveInfo
) => {
  return await resolve(parent, args, context, info)
}

const uppercaseTitle = async (
  resolve: (...args: any[]) => any, // Resolve return value of field
  parent: any,
  args: GraphQLArgs,
  context: IContext,
  info: GraphQLResolveInfo
) => {
  const result = await resolve(parent, args, context, info)
  return result.toUpperCase()
}

export default { logInput, logResult, uppercaseTitle }
