/* ---------------------------------- Boot ---------------------------------- */
import './bootstrap'
/* ----------------------------- Custom Modules ----------------------------- */
import yogaServer from './applications/yoga.app'
import sofaServer from './applications/sofa.app'
import startMetricsServer from './applications/prometheus'
import { printInformation } from './common/helpers/information.helper'
/* -------------------------------------------------------------------------- */

printInformation(process.env.GRAPHQL_PORT)
yogaServer()
sofaServer()
startMetricsServer()
