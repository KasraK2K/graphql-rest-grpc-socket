/* ------------------------------ Dependencies ------------------------------ */
import { gql } from 'graphql-tag'
import { GraphQLArgs, GraphQLResolveInfo } from 'graphql'
/* --------------------------------- Modules -------------------------------- */
import userService from './user.service'

const resolvers = {
  Query: {
    users: (parent: any, args: GraphQLArgs, contextValue: any, info: GraphQLResolveInfo) =>
      userService.findAll(parent, args, contextValue, info),
  },
}

const typeDefs = gql`
  type Query {
    users: [UserResponse]
  }

  type UserResponse {
    id: Int
    name: String
  }
`

export { resolvers, typeDefs }
