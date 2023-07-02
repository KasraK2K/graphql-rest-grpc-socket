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
import config from 'config'
/* ----------------------------- Custom Modules ----------------------------- */
import schema from '../graphql/schema'
import { IContext, context } from '../graphql/context'
import colour from '../common/utils/logColour.util'
import errorHandler from '../common/helpers/errors/error.handler'
import tokenHelper from '../common/helpers/token.helper'
import { Gender, UserType } from '../common/enums/general.enum'
import { IApplicationConfig } from '../../config/config.interface'
/* -------------------------------------------------------------------------- */

const applicationConfig: IApplicationConfig = config.get('application')

/* -------------------------------------------------------------------------- */
/*                                 Sofa Server                                */
/* -------------------------------------------------------------------------- */
function main(port: string) {
    const app = express()
    const sofa = useSofa({
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
        basePath: '/',
        enumTypes: { Gender, UserType },
        swaggerUI: { endpoint: '/swagger', showTags: true },
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
