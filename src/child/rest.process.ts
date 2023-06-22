/* ------------------------------ Node Modules ------------------------------ */
import { createServer } from 'node:http'
/* ------------------------------ Dependencies ------------------------------ */
import express from 'express'
import { createSchema } from 'graphql-yoga'
import { useSofa } from 'sofa-api'
/* ----------------------------- Custom Modules ----------------------------- */
import typeDefs from '../graphql/typeDefs'
import resolvers from '../graphql/resolvers'
import { context } from '../graphql/context'
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/*                                 Rest Server                                */
/* -------------------------------------------------------------------------- */
const app = express()
const sofa = useSofa({
  schema: createSchema({ typeDefs, resolvers }),
  context,
  basePath: '/',
  swaggerUI: { endpoint: '/swagger' },
  openAPI: {
    info: { title: 'Graphql Boilerplate API', version: '1.0.0' },
    endpoint: '/openapi.json',
  },
  routes: {
    'Query.users': { method: 'GET' },
  },
})

app.use('/', sofa)
const childProcess = createServer(app)

export default childProcess
