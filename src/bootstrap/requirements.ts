/* ------------------------------ Dependencies ------------------------------ */
import assert from 'assert'
/* -------------------------------------------------------------------------- */

const REQUIRED_ENVIRONMENTS: string[] = [
    'NODE_ENV',
    'GRAPHQL_PORT',
    'REST_PORT',
    'SERVER_ADDRESS',
    'API_KEY',
    'RBBITMQ_URI'
    // 'MONGO_URI',
    // 'METRIC_PORT',
    // 'SENTRY_DSN',
]

for (const key of REQUIRED_ENVIRONMENTS)
    assert.ok(process.env[key], `The ${key} environment variable is required`)
