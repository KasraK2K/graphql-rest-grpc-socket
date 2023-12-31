/* ------------------------------ Node Modules ------------------------------ */
import { join } from 'node:path'
/* ------------------------------ Dependencies ------------------------------ */
import { loadFilesSync } from '@graphql-tools/load-files'
import { typeDefs as scalarTypeDefs } from 'graphql-scalars'
import { GraphQLSchema } from 'graphql'
import { cacheControlDirective } from '@envelop/response-cache'
/* -------------------------------------------------------------------------- */

const globalSchema = loadFilesSync<GraphQLSchema>(join(__dirname, './global.graphql'))
const subSchemas = loadFilesSync<GraphQLSchema>(join(process.cwd(), 'src/modules/**/*.graphql'))

const typeDefs = [cacheControlDirective, ...globalSchema, ...subSchemas, ...scalarTypeDefs]

export default typeDefs
