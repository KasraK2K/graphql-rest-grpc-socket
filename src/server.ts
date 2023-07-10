/* ---------------------------------- Boot ---------------------------------- */
import './bootstrap'
/* ----------------------------- Custom Modules ----------------------------- */
import yogaServer from './applications/yoga.app'
import sofaServer from './applications/sofa.app'
import startMetricsServer from './applications/prometheus'
import { printInformation } from './common/helpers/information.helper'
import { startGrpcServers } from './applications/gRPC'
import { gRPCServer } from './applications/gRPC/constants/enums'
import { registerSocketServer } from './applications/socket'
/* -------------------------------------------------------------------------- */

printInformation(process.env.GRAPHQL_PORT)
yogaServer()
sofaServer()
startMetricsServer()
startGrpcServers([gRPCServer.DEFAULT])
registerSocketServer()
