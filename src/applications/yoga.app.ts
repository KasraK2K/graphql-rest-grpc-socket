//=============================================================================================
//
//  ##    ##   #####    ####      ###           ####  #####  #####    ##   ##  #####  #####
//   ##  ##   ##   ##  ##        ## ##         ##     ##     ##  ##   ##   ##  ##     ##  ##
//    ####    ##   ##  ##  ###  ##   ##         ###   #####  #####    ##   ##  #####  #####
//     ##     ##   ##  ##   ##  #######           ##  ##     ##  ##    ## ##   ##     ##  ##
//     ##      #####    ####    ##   ##        ####   #####  ##   ##    ###    #####  ##   ##
//
//=============================================================================================

/* ------------------------------ Node Modules ------------------------------ */
import { createServer } from 'node:http'
/* ------------------------------ Dependencies ------------------------------ */
import { createYoga } from 'graphql-yoga'
import { useResponseCache } from '@graphql-yoga/plugin-response-cache'
/* ----------------------------- Custom Modules ----------------------------- */
import schema from '../graphql/schema'
import { context } from '../graphql/context'
import colour from '../common/utils/logColour.util'
import logger from '../common/helpers/logger.helper'
/* -------------------------------------------------------------------------- */

function main(port: string) {
  const yoga = createYoga({
    schema,
    async context(req: any) {
      console.log({ headers: req.headers })
      const token = req.headers?.authorization
      return {
        ...context,
        token,
      }
    },
    landingPage: false,
    graphqlEndpoint: '/',
    batching: true,
    plugins: [useResponseCache({ session: () => null, ttl: 10_000 })],
    logging: {
      debug(message: string, args: Record<string, any>) {
        logger.debug(message, args)
      },
      info(message: string, args: Record<string, any>) {
        logger.info(message, args)
      },
      warn(message: string, args: Record<string, any>) {
        logger.warn(message, args)
      },
      error(message: string, args: Record<string, any>) {
        logger.error(message, args)
      },
    },
  })

  const server = createServer(yoga)
  server
    .listen(port)
    .on('listening', () =>
      console.info(
        `${colour.love('GraphQL')}\t server ready at: ${colour.love.underline(
          `http://localhost:${port}`
        )}`
      )
    )
    .on('error', (err) => {
      console.error('on error', err)
    })
}

export default main
