import { join } from 'node:path'
import { loadFilesSync } from '@graphql-tools/load-files'
import { typeDefs as scalarTypeDefs } from 'graphql-scalars'
import { GraphQLSchema } from 'graphql'

const globalSchema = loadFilesSync(join(__dirname, './global.graphql'))
const subSchemas = loadFilesSync(join(process.cwd(), 'src/modules/**/*.graphql'))

// ─────────────────────────────────────────────────────────────────────────────────────
//   :::::: NOTE: Microservice External Schema : :  :   :    :     :        :          :
// ─────────────────────────────────────────────────────────────────────────────────────
// import { loadSchemaSync } from '@graphql-tools/load'
// import { UrlLoader } from '@graphql-tools/url-loader'

// const microserviceExternalSchema = loadSchemaSync('https://ch1.graphql.guide/graphql', {
//   loaders: [new UrlLoader()],
// })
// subSchemas.push(microserviceExternalSchema)
// ─────────────────────────────────────────────────────────────────────────────────────

const typeDefs = [...scalarTypeDefs, globalSchema, ...subSchemas]

export default typeDefs
