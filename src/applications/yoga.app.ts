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
import { IContext, context } from '../graphql/context'
import colour from '../common/utils/logColour.util'
import logger from '../common/helpers/logger.helper'
import { useCache, useToken } from './plugins'
// import graphErrorHandler from '../common/helpers/errors/error.handler'
/* -------------------------------------------------------------------------- */

function main(port: string) {
    const yoga = createYoga({
        schema,
        context: async (ctx: IContext) => {
            // const authorization = ctx.request.headers.get('authorization')
            // if (!authorization) graphErrorHandler(401)
            // else {
            //   const token = authorization.slice(7)
            //   // TODO : check token role/permission
            //   if (false) graphErrorHandler(403)
            // }

            // // TODO : Remove redis cache on logout
            // console.log(context.cacheKey)

            return context
        },
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
        plugins: [useCache(), useToken()]
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
