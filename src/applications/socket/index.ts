/* ----------------------------- Custom Modules ----------------------------- */
import colour from '../../common/utils/logColour.util'
import { io } from '../exporter'
/* ----------------------------- Events Handler ----------------------------- */
import connectionEvent from './events/connection.handler'
/* -------------------------------------------------------------------------- */

// prettier-ignore
const events = [
  { name: 'connection', callback: connectionEvent },
]

const socketServer = () => {
    for (const event of events) {
        io.sockets.on(event.name, (socket) => {
            event.callback(socket)
        })
    }

    console.info(
        `${colour.love('Socket')}\t server ready at: ${colour.love.underline(
            process.env.REST_SERVER_ADDRESS
        )}`
    )
}

export default socketServer
