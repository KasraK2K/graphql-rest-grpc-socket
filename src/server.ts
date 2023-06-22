/* ------------------------------ Node Modules ------------------------------ */
import { createServer } from 'node:http'
/* ------------------------------ Dependencies ------------------------------ */
import { createSchema, createYoga } from 'graphql-yoga'
import { useSofa } from 'sofa-api'
import { useResponseCache } from '@graphql-yoga/plugin-response-cache'
import chalk from 'chalk'
/* ----------------------------- Custom Modules ----------------------------- */
import typeDefs from './graphql/typeDefs'
import resolvers from './graphql/resolvers'
import { context } from './graphql/context'
import restChildProcess from './child/rest.process'
/* -------------------------------------------------------------------------- */

/* -------------------------------- Constants ------------------------------- */
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
export const yoga = createYoga({
  schema: createSchema({ typeDefs, resolvers }),
  context,
  landingPage: false,
  graphqlEndpoint: '/',
  plugins: [useResponseCache({ session: () => null, ttl: 10_000 })],
})

const server = createServer(yoga)
server
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

restChildProcess
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
