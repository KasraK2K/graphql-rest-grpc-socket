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
import { IContext, context } from '../graphql/context'
import colour from '../common/utils/logColour.util'
import errorHandler from '../common/helpers/errors/error.handler'
import tokenHelper from '../common/helpers/token.helper'
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/*                                 Sofa Server                                */
/* -------------------------------------------------------------------------- */
function main(port: string) {
    const app = express()
    const sofa = useSofa({
        schema,
        context: async (ctx: IContext) => {
            const authorization = ctx.request.headers.get('authorization')
            if (authorization) {
                const token = authorization.slice(7)
                const { valid, data } = tokenHelper.verify(token)
                //   // TODO : check token role/permission
                if (!valid) throw errorHandler(403)
                else ctx.token_payload = data
            }

            // // TODO : Remove redis cache on logout
            // console.log(context.cacheKey)

            return context
        },
        basePath: '/',
        swaggerUI: { endpoint: '/swagger' },
        openAPI: {
            info: { title: 'Graphql Boilerplate API', version: '1.0.0' },
            endpoint: '/openapi.json'
        },
        routes: {
            'Query.users': { method: 'GET' }
        }
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
