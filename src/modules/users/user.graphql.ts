import { gql } from 'graphql-tag'
import userService from './user.service'

const resolvers = {
  Query: {
    users: () => userService.findAll(),
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
