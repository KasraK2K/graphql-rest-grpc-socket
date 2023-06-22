//===============================================================
//
//   ####    #####      ###    #####   ##   ##   #####   ##
//  ##       ##  ##    ## ##   ##  ##  ##   ##  ##   ##  ##
//  ##  ###  #####    ##   ##  #####   #######  ##   ##  ##
//  ##   ##  ##  ##   #######  ##      ##   ##   #####   ##
//   ####    ##   ##  ##   ##  ##      ##   ##  ##       ######
//
//===============================================================
// GraphQL server function using Yoga
//===============================================================

/* ------------------------------ Node Modules ------------------------------ */
import { createServer } from 'node:http'
/* ------------------------------ Dependencies ------------------------------ */
import { createYoga } from 'graphql-yoga'
import { useResponseCache } from '@graphql-yoga/plugin-response-cache'
/* ----------------------------- Custom Modules ----------------------------- */
import schema from '../graphql/schema'
import { context } from '../graphql/context'
import colour from '../common/utils/logColour.util'
/* -------------------------------- Constants ------------------------------- */
const GRAPHQL_PORT = process.env.PORT || '3000'
/* -------------------------------------------------------------------------- */

function main() {
  const yoga = createYoga({
    schema,
    context,
    landingPage: false,
    graphqlEndpoint: '/',
    batching: true,
    plugins: [useResponseCache({ session: () => null, ttl: 10_000 })],
  })

  const server = createServer(yoga)
  server
    .listen(GRAPHQL_PORT)
    .on('listening', () =>
      console.info(
        `${colour.love('GraphQL')}\t server ready at: ${colour.love.underline(
          `http://localhost:${GRAPHQL_PORT}`
        )}`
      )
    )
    .on('error', (err) => {
      console.error('on error', err)
    })
}

export default main
