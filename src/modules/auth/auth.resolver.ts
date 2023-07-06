/* ------------------------------ Dependencies ------------------------------ */
import { GraphQLResolveInfo } from 'graphql'
import _ from 'lodash'
/* ----------------------------- Custom Modules ----------------------------- */
import authService from './auth.service'
import { IContext } from '../../graphql/context'
import { IUserAuthResponse, IAdminAuthResponse } from '../../common/interfaces'
/* -------------------------------------------------------------------------- */

const resolvers = {
    Query: {
        loginAdmin: async (
            _parent: IAdminAuthResponse,
            args: { email: string; password: string },
            _context: IContext,
            _info: GraphQLResolveInfo
        ): Promise<IAdminAuthResponse> => {
            const { token, admin } = await authService.loginAdmin(args)
            return { token, admin }
        },

        loginUser: async (
            _parent: IUserAuthResponse,
            args: { email: string; password: string },
            _context: IContext,
            _info: GraphQLResolveInfo
        ): Promise<IUserAuthResponse> => {
            const { token, user } = await authService.loginUser(args)
            return { token, user }
        }
    },

    Mutation: {
        registerAdmin: async (
            _parent: IAdminAuthResponse,
            args: { email: string; password: string },
            context: IContext,
            _info: GraphQLResolveInfo
        ): Promise<IAdminAuthResponse> => {
            const { token, admin } = await authService.registerAdmin(context, args)
            return { token, admin }
        },

        registerUser: async (
            _parent: IUserAuthResponse,
            args: { email: string; password: string },
            _context: IContext,
            _info: GraphQLResolveInfo
        ): Promise<IUserAuthResponse> => {
            const { token, user } = await authService.registerUser(args)
            return { token, user }
        }
    }
}

export default resolvers
