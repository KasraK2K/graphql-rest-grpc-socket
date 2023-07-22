/* ----------------------------- Custom Modules ----------------------------- */
import { gRPCServerNames } from './constants/enums'
/* -------------------------------------------------------------------------- */

/* ------------------------------ Default gRPC ------------------------------ */
import { startGreetingServer } from './servers/default/default.grpc'
/* -------------------------------------------------------------------------- */

export const startGrpcServers = (serverNames: number[]) => {
    for (const name of serverNames) serverSwitch(name)
}

/* SECTION --------------------------- Register Servers --------------------- */
const serverSwitch = (serverName: number) => {
    switch (serverName) {
        case gRPCServerNames.DEFAULT:
            startGreetingServer()
            break
    }
}
/* -------------------------------------------------------------------------- */
