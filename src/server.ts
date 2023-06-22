/* ------------------------------ Dependencies ------------------------------ */
import { createServer } from 'node:http'
import { createYoga, createSchema } from 'graphql-yoga'
import { useSofa } from '@graphql-yoga/plugin-sofa'
import { useResponseCache } from '@graphql-yoga/plugin-response-cache'
import chalk from 'chalk'

/* --------------------------------- Modules -------------------------------- */
import resolvers from './graphql/resolvers'
import typeDefs from './graphql/typeDefs'
import { Context, context } from './graphql/context'
import { YogaSchemaDefinition } from 'graphql-yoga/typings/plugins/use-schema'

/* -------------------------------- Constants ------------------------------- */
const schema: YogaSchemaDefinition<Context> = createSchema({ typeDefs, resolvers })
const GRAPHQL_PORT = Number(process.env.PORT) || 3000
const REST_PORT = Number(process.env.PORT) || 3500

const gqlStyle = chalk.hex('#f6009b')
// const errStyle = chalk.hex('#FF0000').bold
// const warnStyle = chalk.hex('#FFFF00').bold
// const successStyle = chalk.hex('#00FF00')

/* -------------------------------------------------------------------------- */
/*                               GraphQL Server                               */
/* -------------------------------------------------------------------------- */
// Create a Yoga instance with a GraphQL schema.
const yoga = createYoga({
  schema,
  context,
  landingPage: false,
  graphqlEndpoint: '/',
  plugins: [useResponseCache({ session: () => null, ttl: 1_000 })],
})

// Create a Yoga RestAPI instance.
const yogaRest = createYoga({
  schema,
  context,
  landingPage: false,
  graphiql: false,
  graphqlEndpoint: '/',
  plugins: [
    useSofa({
      basePath: '/',
      swaggerUI: { endpoint: '/swagger' },
      openAPI: {
        info: { title: 'Graphql Boilerplate API', version: '1.0.0' },
        endpoint: '/openapi.json',
      },
      routes: {
        'Query.users': { method: 'POST' },
      },
    }),
  ],
})

const yogaServer = createServer(yoga)
yogaServer
  .listen(GRAPHQL_PORT)
  .on('listening', () =>
    console.info(
      `${gqlStyle('GraphQL')}\t server ready at: ${gqlStyle.underline(
        `http://localhost:${GRAPHQL_PORT}`
      )}`
    )
  )
  .on('error', (err) => {
    console.error('on error', err)
  })

const yogaRestServer = createServer(yogaRest)
yogaRestServer
  .listen(REST_PORT)
  .on('listening', () =>
    console.info(
      `${gqlStyle('HTTP')}\t server ready at: ${gqlStyle.underline(
        `http://localhost:${REST_PORT}`
      )}`
    )
  )
  .on('error', (err) => {
    console.error('on error', err)
  })
