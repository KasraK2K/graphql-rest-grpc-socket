//========================================================================================
//
//   ####   #####   #####    ###           ####  #####  #####    ##   ##  #####  #####
//  ##     ##   ##  ##      ## ##         ##     ##     ##  ##   ##   ##  ##     ##  ##
//   ###   ##   ##  #####  ##   ##         ###   #####  #####    ##   ##  #####  #####
//     ##  ##   ##  ##     #######           ##  ##     ##  ##    ## ##   ##     ##  ##
//  ####    #####   ##     ##   ##        ####   #####  ##   ##    ###    #####  ##   ##
//
//========================================================================================

/* ------------------------------ Node Modules ------------------------------ */
import { createServer } from 'node:http'
/* ------------------------------ Dependencies ------------------------------ */
import express from 'express'
import { useSofa } from 'sofa-api'
/* ----------------------------- Custom Modules ----------------------------- */
import schema from '../graphql/schema'
import { context } from '../graphql/context'
import colour from '../common/utils/logColour.util'
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/*                                 Sofa Server                                */
/* -------------------------------------------------------------------------- */
function main(port: string) {
  const app = express()
  const sofa = useSofa({
    schema,
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
  const restAppServer = createServer(app)

  restAppServer
    .listen(port)
    .on('listening', () =>
      console.info(
        `${colour.love('HTTP')}\t server ready at: ${colour.love.underline(
          `http://localhost:${port}`
        )}`
      )
    )
    .on('error', (err) => {
      console.error('on error', err)
    })
}

export default main
