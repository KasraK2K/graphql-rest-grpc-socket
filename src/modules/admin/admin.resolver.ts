/* ------------------------------ Dependencies ------------------------------ */
import { GraphQLResolveInfo } from 'graphql'
/* ----------------------------- Custom Modules ----------------------------- */
import adminService from './admin.service'
import { IContext } from '../../graphql/context'
import { IAdmin } from '../../common/interfaces'
/* -------------------------------------------------------------------------- */

const resolvers = {
    Query: {
        admin: async (
            _parent: IAdmin,
            args: { email: string },
            _context: IContext,
            _info: GraphQLResolveInfo
        ): Promise<IAdmin> => await adminService.getAdmin(args)
    },

    Mutation: {
        addAdmin: async (
            _parent: IAdmin,
            args: { email: string; password: string },
            _context: IContext,
            _info: GraphQLResolveInfo
        ): Promise<IAdmin> => await adminService.addAdmin(args)
    }
}

export default resolvers
