import { join } from 'node:path'
import { loadFilesSync } from '@graphql-tools/load-files'

const globalSchema = loadFilesSync(join(__dirname, './global.graphql'))
const subSchemas = loadFilesSync(join(process.cwd(), 'src/modules/**/*.graphql'))

const typeDefs = [globalSchema, subSchemas]

export default typeDefs
