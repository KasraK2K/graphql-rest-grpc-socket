import { join } from 'node:path'
import { loadFilesSync } from '@graphql-tools/load-files'
import { typeDefs as scalarTypeDefs } from 'graphql-scalars'

const globalSchema = loadFilesSync(join(__dirname, './global.graphql'))
const subSchemas = loadFilesSync(join(process.cwd(), 'src/modules/**/*.graphql'))

const typeDefs = [...scalarTypeDefs, globalSchema, subSchemas]

export default typeDefs
