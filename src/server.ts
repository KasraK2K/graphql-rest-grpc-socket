/* ---------------------------------- Boot ---------------------------------- */
import './bootstrap'
/* ----------------------------- Custom Modules ----------------------------- */
import yogaServer from './applications/yoga.app'
import sofaServer from './applications/sofa.app'
/* -------------------------------- Constants ------------------------------- */
const GRAPHQL_PORT = process.env.GRAPHQL_PORT || '3000'
const REST_PORT = process.env.REST_PORT || '3500'
/* -------------------------------------------------------------------------- */

yogaServer(GRAPHQL_PORT)
sofaServer(REST_PORT)
