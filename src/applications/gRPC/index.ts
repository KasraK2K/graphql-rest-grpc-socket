/* ----------------------------- Custom Modules ----------------------------- */
import { gRPCServer } from './constants/enums'
/* -------------------------------------------------------------------------- */

/* ------------------------------ Default gRPC ------------------------------ */
import { startGreetingClient, startGreetingServer } from './default/register.grpc'
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
        case gRPCServer.GREETINGS:
            startGreetingServer()
            break
    }
}
/* -------------------------------------------------------------------------- */

/* SECTION -------------------- Register Clients ---------------------------- */
const clientSwitch = (clientName: number) => {
    switch (clientName) {
        case gRPCServer.GREETINGS:
            startGreetingClient()
            break
    }
}
/* -------------------------------------------------------------------------- */
