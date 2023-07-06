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
import { Gender, UserType } from '../common/enums/general.enum'
/* -------------------------------------------------------------------------- */

const REST_PORT = process.env.REST_PORT || '3500'

/* -------------------------------------------------------------------------- */
/*                                 Sofa Server                                */
/* -------------------------------------------------------------------------- */
function main() {
    const app = express()
    const sofa = useSofa({
        schema,
        context,
        basePath: '/',
        enumTypes: { Gender, UserType },
        swaggerUI: { endpoint: '/swagger' },
        openAPI: {
            info: { title: 'Graphql Boilerplate API', version: '1.0.0' },
            endpoint: '/openapi.json'
        }
        // routes: {
        //     'Query.user': { method: 'GET' }
        // }
    })

    app.use('/', sofa)
    const restAppServer = createServer(app)

    restAppServer
        .listen(REST_PORT)
        .on('listening', () =>
            console.info(
                `${colour.love('HTTP')}\t server ready at: ${colour.love.underline(
                    process.env.REST_SERVER_ADDRESS
                )}`
            )
        )
        .on('error', (err) => {
            console.error('on error', err)
        })
}

export default main
