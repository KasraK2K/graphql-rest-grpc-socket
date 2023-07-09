/* ----------------------------- Custom Modules ----------------------------- */
import colour from '../../../../common/utils/logColour.util'
import { grpc, grpcServer } from '../../constants/grpc.config'
/* ------------------------------ gRPC Services ----------------------------- */
import './modules/auth/auth.service'
/* -------------------------------------------------------------------------- */

/* ------------------------------ Start Client ------------------------------ */
export const startGreetingClient = () => {
    grpcServer.bindAsync(
        process.env.GRPC_ADDRESS,
        grpc.ServerCredentials.createInsecure(),
        (error, _port) => {
            if (error) console.log(error)
            console.log(
                `${colour.love('gRPC')}\t client ready at: ${colour.green.underline(
                    `${process.env.GRPC_ADDRESS}`
                )}`
            )
            grpcServer.start()
        }
    )
}
/* -------------------------------------------------------------------------- */

/* ------------------------------ Start Server ------------------------------ */
export const startGreetingServer = () => {
    grpcServer.bindAsync(
        process.env.GRPC_ADDRESS,
        grpc.ServerCredentials.createInsecure(),
        (error, _port) => {
            if (error) console.log(error)
            console.log(
                `${colour.love('gRPC')}\t server ready at: ${colour.love.underline(
                    `${process.env.GRPC_ADDRESS}`
                )}`
            )
            grpcServer.start()
        }
    )
}
/* -------------------------------------------------------------------------- */
