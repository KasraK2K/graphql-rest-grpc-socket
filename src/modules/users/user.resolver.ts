/* ------------------------------ Dependencies ------------------------------ */
import { GraphQLArgs, GraphQLResolveInfo } from 'graphql'
/* ------------------------------ Node Modules ------------------------------ */
import { Context } from '../../graphql/context'
import { IUser } from './constants/interfaces'
/* -------------------------------------------------------------------------- */

const resolvers = {
  Query: {
    users: (_: IUser, __: GraphQLArgs, contextValue: Context, info: GraphQLResolveInfo): IUser[] =>
      contextValue.dataSource.user.service.findAll(contextValue, info),
  },
}

export default resolvers
