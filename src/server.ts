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
const PORT = Number(process.env.PORT) || 3000
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
  plugins: [
    useSofa({
      basePath: '/rest',
      swaggerUI: {
        endpoint: '/swagger',
      },
      openAPI: {
        info: {
          title: 'Graphql Boilerplate API',
          version: '1.0.0',
        },
        endpoint: '/openapi.json',
      },
    }),
    // useResponseCache({ session: () => null, ttl: 1_000 }),
  ],
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
