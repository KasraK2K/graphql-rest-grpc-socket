/* ------------------------------ Dependencies ------------------------------ */
import { GraphQLArgs, GraphQLResolveInfo } from 'graphql'
/* ----------------------------- Custom Modules ----------------------------- */
import { IContext } from '../graphql/context'
import errorHandler from '../common/helpers/errors/error.handler'
/* -------------------------------------------------------------------------- */

const authMiddleware = async (
    resolve: (...args: any[]) => any, // Resolve return value of field
    parent: any,
    args: GraphQLArgs,
    context: IContext,
    info: GraphQLResolveInfo
) => {
    const authorization: string = context.request.headers.get('Authorization')
    const token = authorization && authorization.length ? authorization.slice(7) : undefined

    /* ----------------------------- Token Not Found ---------------------------- */
    !token && errorHandler(401)

    /* --------------------- Has Not Enough Role/Permission --------------------- */
    // <check permission> && errorHandler(info, 403)

    const result = await resolve(parent, args, context, info)
    return result

    // else errorHandler(info, 401)
}

export default authMiddleware
