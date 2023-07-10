//========================================================================================
//
//   ####   #####   #####    ###           ####  #####  #####    ##   ##  #####  #####
//  ##     ##   ##  ##      ## ##         ##     ##     ##  ##   ##   ##  ##     ##  ##
//   ###   ##   ##  #####  ##   ##         ###   #####  #####    ##   ##  #####  #####
//     ##  ##   ##  ##     #######           ##  ##     ##  ##    ## ##   ##     ##  ##
//  ####    #####   ##     ##   ##        ####   #####  ##   ##    ###    #####  ##   ##
//
//========================================================================================

/* ------------------------------ Dependencies ------------------------------ */
import { useSofa } from 'sofa-api'
/* ----------------------------- Custom Modules ----------------------------- */
import schema from '../graphql/schema'
import { context } from '../graphql/context'
import colour from '../common/utils/logColour.util'
import { Gender, UserType } from '../common/enums/general.enum'
import { app, restAppServer, REST_PORT } from './exporter'
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/*                                 Sofa Server                                */
/* -------------------------------------------------------------------------- */
function main() {
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

    restAppServer
        .listen(REST_PORT)
        .on('listening', () =>
            console.info(
                `${colour.love('Http')}\t server ready at: ${colour.love.underline(
                    process.env.REST_SERVER_ADDRESS
                )}`
            )
        )
        .on('error', (err) => {
            console.error('on error', err)
        })
}

export default main
