import { join } from 'node:path'
import { loadFilesSync } from '@graphql-tools/load-files'
import { typeDefs as scalarTypeDefs } from 'graphql-scalars'
import { GraphQLSchema } from 'graphql'

const globalSchema = loadFilesSync<GraphQLSchema>(join(__dirname, './global.graphql'))
const subSchemas = loadFilesSync<GraphQLSchema>(join(process.cwd(), 'src/modules/**/*.graphql'))

const typeDefs = [...globalSchema, ...subSchemas, ...scalarTypeDefs]

export default typeDefs
