/* ------------------------------ Dependencies ------------------------------ */
import { GraphQLArgs, GraphQLResolveInfo } from 'graphql'
/* ----------------------------- Custom Modules ----------------------------- */
import { IContext } from './context'
import graphErrorHandler from '../common/helpers/errors/error.handler'
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
  const result = await resolve(parent, args, context, info)
  return result
}

const logResult = async (
  resolve: (...args: any[]) => any,
  parent: any,
  args: GraphQLArgs,
  context: IContext,
  info: GraphQLResolveInfo
) => {
  const result = await resolve(parent, args, context, info)
  console.log('logResult:', result)
  return result
}

const authMiddleware = async (
  resolve: (...args: any[]) => any, // Resolve return value of field
  parent: any,
  args: GraphQLArgs,
  context: IContext,
  info: GraphQLResolveInfo
) => {
  const authorization: string = context.request.headers.get('Authorization')
  context.token = authorization && authorization.length ? authorization.slice(7) : undefined

  /* ----------------------------- Token Not Found ---------------------------- */
  !context.token && graphErrorHandler(info, 401)

  /* --------------------- Has Not Enough Role/Permission --------------------- */
  // <check permission> && graphErrorHandler(info, 403)

  const result = await resolve(parent, args, context, info)
  return result

  // else graphErrorHandler(info, 401)
}

const uppercaseText = async (
  resolve: (...args: any[]) => any, // Resolve return value of field
  parent: any,
  args: GraphQLArgs,
  context: IContext,
  info: GraphQLResolveInfo
) => {
  const result = await resolve(parent, args, context, info)
  return result.toUpperCase()
}

export default { logInput, logResult, authMiddleware, uppercaseText }
