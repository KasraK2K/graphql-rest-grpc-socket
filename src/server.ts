/* ------------------------------ Dependencies ------------------------------ */
import { createServer } from 'node:http'
import { createYoga } from 'graphql-yoga'
import chalk from 'chalk'
import { makeExecutableSchema } from '@graphql-tools/schema'

/* --------------------------------- Modules -------------------------------- */
import resolvers from './graphql/resolvers'
import typeDefs from './graphql/typeDefs'
import { context } from './graphql/context'
import { GraphQLError } from 'graphql/error/GraphQLError'

/* -------------------------------- Constants ------------------------------- */
const PORT = Number(process.env.PORT) || 3000
const gqlStyle = chalk.hex('#f6009b')
const errStyle = chalk.hex('#FF0000').bold
const warnStyle = chalk.hex('#FFFF00').bold
const successStyle = chalk.hex('#00FF00')

/* -------------------------------------------------------------------------- */
/*                               GraphQL Server                               */
/* -------------------------------------------------------------------------- */
// Create a Yoga instance with a GraphQL schema.
const yoga = createYoga({
  schema: makeExecutableSchema({ typeDefs, resolvers }),
  context,
  landingPage: false,
  graphqlEndpoint: '/',
})

// Pass it into a server to hook into request handlers.
const server = createServer(yoga)

server
  .listen(PORT)
  .on('listening', () =>
    console.info(
      `${gqlStyle('GraphQL')} server ready at: ${gqlStyle.underline(`http://localhost:${PORT}`)}`
    )
  )
  .on('error', (err) => {
    console.error('on error', err)
  })
