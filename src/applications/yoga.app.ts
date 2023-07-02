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
import config from 'config'
/* ----------------------------- Custom Modules ----------------------------- */
import schema from '../graphql/schema'
import { IContext, context } from '../graphql/context'
import colour from '../common/utils/logColour.util'
import logger from '../common/helpers/logger.helper'
import { /*useCache, */ useToken } from './plugins'
import errorHandler from '../common/helpers/errors/error.handler'
import tokenHelper from '../common/helpers/token.helper'
import { IApplicationConfig } from '../../config/config.interface'
/* -------------------------------------------------------------------------- */

const applicationConfig: IApplicationConfig = config.get('application')

function main(port: string) {
    const yoga = createYoga({
        schema,
        context: async (ctx: IContext) => {
            const authorization = ctx.request.headers.get(applicationConfig.bearerHeader)
            if (authorization) {
                const token = authorization.slice(applicationConfig.bearer.length + 1)
                const { valid, data } = tokenHelper.verify(token)
                if (!valid) throw errorHandler(403)
                else {
                    ctx.token = token
                    ctx.token_payload = data
                }
            }
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
        plugins: [/*useCache(), */ useToken()]
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
