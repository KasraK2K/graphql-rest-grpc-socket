/* ------------------------------ Dependencies ------------------------------ */
import { GraphQLSchemaWithContext, createSchema } from 'graphql-yoga'
// import { loadFilesSync } from '@graphql-tools/load-files'
/* ----------------------------- Custom Modules ----------------------------- */
import { IContext } from './context'
import typeDefs from './typeDefs'
import resolvers from './resolvers'
/* -------------------------------------------------------------------------- */

// const schema = createSchema({
//   typeDefs: loadFilesSync('src/**/*.graphql'),
//   resolvers: loadFilesSync('src/**/*.resolver.{js,ts}'),
// }) as unknown as GraphQLSchemaWithContext<IContext>

const schema = createSchema({ typeDefs, resolvers }) as GraphQLSchemaWithContext<IContext>

export default schema
