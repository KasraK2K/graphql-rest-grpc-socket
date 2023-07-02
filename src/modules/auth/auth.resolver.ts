/* ------------------------------ Dependencies ------------------------------ */
import { GraphQLResolveInfo } from 'graphql'
import _ from 'lodash'
/* ----------------------------- Custom Modules ----------------------------- */
import authService from './auth.service'
import { IContext } from '../../graphql/context'
import { UserType } from '../../common/enums/general.enum'
import errorHandler from '../../common/helpers/errors/error.handler'
import { IAuthResponse } from '../../common/interfaces'
/* -------------------------------------------------------------------------- */

const resolvers = {
    Query: {
        loginLocal: async (
            _parent: IAuthResponse,
            args: { type: UserType; email: string; password: string },
            context: IContext,
            _info: GraphQLResolveInfo
        ): Promise<IAuthResponse> => {
            const { token, entity } = await authService.loginLocalEntity(args)
            context.token = token
            _.assign(context.user, { ...entity, type: args.type })
            return { entity, token }
        }
    },

    Mutation: {
        registerLocal: async (
            _parent: IAuthResponse,
            args: { email: string; password: string },
            context: IContext,
            _info: GraphQLResolveInfo
        ): Promise<IAuthResponse> => {
            if (context.token_payload.user_type === UserType.USER) {
                const entity = await authService.registerLocalUser(args)
                _.assign(context.user, entity)
                return { token: 'some', entity }
            } else throw errorHandler(403)
        }
    }
}

export default resolvers
