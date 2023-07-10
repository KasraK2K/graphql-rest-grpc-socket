/* ------------------------------ Dependencies ------------------------------ */
import express, { Request, Response } from 'express'
import client from 'prom-client'
/* ----------------------------- Custom Modules ----------------------------- */
import colour from '../../common/utils/logColour.util'
/* -------------------------------------------------------------------------- */

const app = express()
const PROMETHEUS_PORT = process.env.PROMETHEUS_PORT || '4000'
// const register = new client.Registry()

const metricsServer = () => {
    client.collectDefaultMetrics()

    app.get('/metrics', async (_: Request, res: Response) => {
        res.set('Content-Type', client.register.contentType)
        return res.send(await client.register.metrics())
    })

    app.listen(PROMETHEUS_PORT, () =>
        console.log(
            `${colour.love('Metrics')}\t server ready at: ${colour.love.underline(
                process.env.PROMETHEUS_SERVER_ADDRESS
            )}`
        )
    )
}

export default metricsServer
