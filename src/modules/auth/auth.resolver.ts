/* ------------------------------ Dependencies ------------------------------ */
import { GraphQLResolveInfo } from 'graphql'
import _ from 'lodash'
/* ----------------------------- Custom Modules ----------------------------- */
import authService from './auth.service'
import { IContext } from '../../graphql/context'
import { UserType } from '../../common/enums/general.enum'
import { IAuthResponse } from '../../common/interfaces'
/* -------------------------------------------------------------------------- */

const resolvers = {
    Query: {
        login: async (
            _parent: IAuthResponse,
            args: { type: UserType; email: string; password: string },
            context: IContext,
            _info: GraphQLResolveInfo
        ): Promise<IAuthResponse> => {
            const { token, entity } = await authService.loginEntity(args)
            context.token = token
            _.assign(context.user, { ...entity, type: args.type })
            return { entity, token }
        }
    },

    Mutation: {
        register: async (
            _parent: IAuthResponse,
            args: { type: UserType; email: string; password: string },
            context: IContext,
            _info: GraphQLResolveInfo
        ): Promise<IAuthResponse> => {
            const { token, entity } = await authService.registerEntity(context, args)
            context.token = token
            _.assign(context.user, { ...entity, type: args.type })
            return { entity, token }
        }
    }
}

export default resolvers
