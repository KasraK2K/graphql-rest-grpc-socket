/* ------------------------------ Dependencies ------------------------------ */
import { GraphQLArgs, GraphQLResolveInfo } from 'graphql'
/* ------------------------------ Node Modules ------------------------------ */
import { IContext } from '../../graphql/context'
import { IUser } from './constants/interfaces'
/* -------------------------------------------------------------------------- */

const resolvers = {
    Query: {
        users: (
            _: IUser,
            __: GraphQLArgs,
            contextValue: IContext,
            info: GraphQLResolveInfo
        ): IUser[] => {
            console.log(contextValue.token)
            return contextValue.dataSource.user.service.findAll(contextValue, info)
        }
    }
}

export default resolvers
