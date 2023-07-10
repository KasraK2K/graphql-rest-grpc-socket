/* ----------------------------- Custom Modules ----------------------------- */
import { gRPCServerNames } from './constants/enums'
/* -------------------------------------------------------------------------- */

/* ------------------------------ Default gRPC ------------------------------ */
import { startGreetingClient, startGreetingServer } from './servers/default/default.grpc'
/* -------------------------------------------------------------------------- */

export const startGrpcServers = (serverNames: number[]) => {
    for (const name of serverNames) serverSwitch(name)
}

export const startGrpcClient = (clientNames: number[]) => {
    for (const name of clientNames) clientSwitch(name)
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

/* SECTION -------------------- Register Clients ---------------------------- */
const clientSwitch = (clientName: number) => {
    switch (clientName) {
        case gRPCServerNames.DEFAULT:
            startGreetingClient()
            break
    }
}
/* -------------------------------------------------------------------------- */
