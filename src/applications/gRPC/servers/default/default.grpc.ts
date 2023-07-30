/* ----------------------------- Custom Modules ----------------------------- */
import colour from '../../../../common/utils/logColour.util'
import { grpc, grpcServer } from '../../constants/grpc.config'
/* ------------------------------ gRPC Services ----------------------------- */
import './modules/auth/auth.service'
/* -------------------------------------------------------------------------- */

/* ------------------------------ Start Server ------------------------------ */
export const startGreetingServer = () => {
    grpcServer.bindAsync(
        process.env.GRPC_ADDRESS,
        grpc.ServerCredentials.createInsecure(),
        (error /* port */) => {
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
