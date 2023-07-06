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
/* ----------------------------- Custom Modules ----------------------------- */
import schema from '../graphql/schema'
import { context } from '../graphql/context'
import colour from '../common/utils/logColour.util'
import logger from '../common/helpers/logger.helper'
/* -------------------------------------------------------------------------- */

const GRAPHQL_PORT = process.env.GRAPHQL_PORT || '3000'

function main() {
    const yoga = createYoga({
        schema,
        context,
        landingPage: false,
        graphqlEndpoint: '/',
        batching: true,
        logging: {
            debug: () => false,
            // debug(message: string, args: Record<string, any>) {
            //   logger.debug(message, args)
            // },
            info(message: string, args: Record<string, any>) {
                logger.info(message, args)
            },
            warn(message: string, args: Record<string, any>) {
                logger.warn(message, args)
            },
            error(message: string, args: Record<string, any>) {
                logger.error(message, args)
            }
        },
        plugins: []
    })

    const server = createServer(yoga)
    server
        .listen(GRAPHQL_PORT)
        .on('listening', () =>
            console.info(
                `${colour.love('GraphQL')}\t server ready at: ${colour.love.underline(
                    process.env.GRAPHQL_SERVER_ADDRESS
                )}`
            )
        )
        .on('error', (err) => {
            console.error('on error', err)
        })
}

export default main
