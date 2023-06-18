/* ------------------------------ Dependencies ------------------------------ */
import { GraphQLArgs, GraphQLResolveInfo } from 'graphql'

/* --------------------------------- Modules -------------------------------- */
import { Context } from '../../graphql/context'
import { IUser } from './constants/interfaces'

const resolvers = {
  Query: {
    users: (_: IUser, __: GraphQLArgs, contextValue: Context, ___: GraphQLResolveInfo): IUser[] =>
      contextValue.dataSource.user.service.findAll(contextValue),
  },
}

export default resolvers
