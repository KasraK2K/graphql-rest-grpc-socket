/* ------------------------------ Dependencies ------------------------------ */
import { GraphQLResolveInfo } from 'graphql'
/* ----------------------------- Custom Modules ----------------------------- */
import userService from './user.service'
import { IContext } from '../../graphql/context'
import { IUser } from './constants/interfaces'
/* -------------------------------------------------------------------------- */

const resolvers = {
    Query: {
        addUser: async (
            _: IUser,
            args: { email: string; password: string },
            __: IContext,
            ___: GraphQLResolveInfo
        ): Promise<IUser> => {
            const user = await userService.addUser(args)
            return user
        },

        user: async (
            _: IUser,
            args: { email: string },
            __: IContext,
            ___: GraphQLResolveInfo
        ): Promise<IUser> => {
            const user = await userService.getUser(args)
            return user
        }
    }
}

export default resolvers
