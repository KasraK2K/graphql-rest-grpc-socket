/* ---------------------------------- Boot ---------------------------------- */
import './bootstrap'
/* ----------------------------- Custom Modules ----------------------------- */
import printInformation from './common/helpers/information.helper'
import yogaServer from './applications/yoga.app'
import sofaServer from './applications/sofa.app'
import socketServer from './applications/socket'
import metricsServer from './applications/prometheus'
import { startGrpcServers } from './applications/gRPC'
import { gRPCServerNames } from './applications/gRPC/constants/enums'
/* -------------------------------------------------------------------------- */

printInformation(process.env.GRAPHQL_PORT)
yogaServer()
sofaServer()
socketServer()
metricsServer()
startGrpcServers([gRPCServerNames.DEFAULT])
