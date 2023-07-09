/* ------------------------------ Dependencies ------------------------------ */
// import { GraphQLResolveInfo } from 'graphql'
/* ----------------------------- Custom Modules ----------------------------- */
// import userService from './user.service'
// import { IContext } from '../../graphql/context'
// import { IUser } from '../../common/interfaces/user.interface'
/* -------------------------------------------------------------------------- */

const resolvers = {
    Query: {
        // user: async (
        //     _parent: IUser,
        //     args: { email: string },
        //     _context: IContext,
        //     _info: GraphQLResolveInfo
        // ): Promise<IUser> => await userService.getUser(args)
    },

    Mutation: {
        // addUser: async (
        //     _parent: IUser,
        //     args: { email: string; password: string },
        //     _context: IContext,
        //     _info: GraphQLResolveInfo
        // ): Promise<IUser> => await userService.addUser(args)
    }
}

export default resolvers
