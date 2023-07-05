/* ------------------------------ Dependencies ------------------------------ */
import assert from 'assert'
/* -------------------------------------------------------------------------- */

const REQUIRED_ENVIRONMENTS: string[] = [
    'NODE_ENV',
    'GRAPHQL_PORT',
    'GRAPHQL_SERVER_ADDRESS',
    'REST_PORT',
    'REST_SERVER_ADDRESS',
    'API_KEY',
    'RBBITMQ_URI',
    'JWT_SECRET',
    'ENCRYPTION_SECRET',
    'PROMETHEUS_PORT',
    'PROMETHEUS_SERVER_ADDRESS',
    'GRPC_PORT',
    'GRPC_ADDRESS'
]

for (const key of REQUIRED_ENVIRONMENTS)
    assert.ok(process.env[key], `The ${key} environment variable is required`)
