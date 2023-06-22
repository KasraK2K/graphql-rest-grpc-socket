/* ------------------------------ Node Modules ------------------------------ */
import { join } from 'node:path'
/* ------------------------------ Dependencies ------------------------------ */
import { loadFilesSync } from '@graphql-tools/load-files'
/* -------------------------------------------------------------------------- */

const subResolvers = loadFilesSync(join(process.cwd(), 'src/modules/**/*.resolver.{js,ts}'))

export default subResolvers
