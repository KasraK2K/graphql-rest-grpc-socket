/* ---------------------------------- Boot ---------------------------------- */
import './bootstrap'
/* ----------------------------- Custom Modules ----------------------------- */
import yogaServer from './applications/yoga.app'
import sofaServer from './applications/sofa.app'
import startMetricsServer from './applications/prometheus'
/* -------------------------------------------------------------------------- */

yogaServer()
sofaServer()
startMetricsServer()
