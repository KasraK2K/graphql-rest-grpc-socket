/* ------------------------------ Dependencies ------------------------------ */
import { GraphQLSchemaWithContext, createSchema } from 'graphql-yoga'
import { applyMiddleware } from 'graphql-middleware'
// import { loadFilesSync } from '@graphql-tools/load-files'
/* ----------------------------- Custom Modules ----------------------------- */
import { IContext } from './context'
import typeDefs from './typeDefs'
import resolvers from './resolvers'
import {
  authMiddleware,
  logInputMiddleware,
  logResultMiddleware,
  uppercaseMiddleware,
} from '../middlewares/index'
/* -------------------------------------------------------------------------- */

// const schema = createSchema({
//   typeDefs: loadFilesSync('src/**/*.graphql'),
//   resolvers: loadFilesSync('src/**/*.resolver.{js,ts}'),
// }) as unknown as GraphQLSchemaWithContext<IContext>

const schema = createSchema({ typeDefs, resolvers }) as GraphQLSchemaWithContext<IContext>

const schemaWithMiddleware = applyMiddleware(
  schema,
  // logInputMiddleware,
  // logResultMiddleware,
  // authMiddleware,
  {
    // Query: {
    //   users: authMiddleware,
    // },
    UserResponse: {
      name: uppercaseMiddleware, // Make name field uppercase
    },
  }
)

export default schemaWithMiddleware
