/* ------------------------------ Dependencies ------------------------------ */
import { GraphQLArgs, GraphQLResolveInfo } from 'graphql'

/* --------------------------------- Modules -------------------------------- */
import userService from './user.service'
import { Context } from '../../graphql/context'
import { IUser } from './constants/interfaces'

const resolvers = {
  Query: {
    users: (_: IUser, __: GraphQLArgs, contextValue: Context, ___: GraphQLResolveInfo): IUser[] =>
      userService.findAll(contextValue),
  },
}

export default resolvers
