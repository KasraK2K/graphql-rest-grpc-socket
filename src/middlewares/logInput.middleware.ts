/* ------------------------------ Dependencies ------------------------------ */
import { GraphQLArgs, GraphQLResolveInfo } from 'graphql'
/* ----------------------------- Custom Modules ----------------------------- */
import { IContext } from '../graphql/context'
/* -------------------------------------------------------------------------- */

const logInputMiddleware = async (
    resolve: (...args: any[]) => any,
    parent: any,
    args: GraphQLArgs,
    context: IContext,
    info: GraphQLResolveInfo
) => {
    console.log('Log Input Middleware:', { args })
    const result = await resolve(parent, args, context, info)
    return result
}

export default logInputMiddleware
