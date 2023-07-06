/* ------------------------------ Dependencies ------------------------------ */
import { loadFilesSync } from '@graphql-tools/load-files'
/* -------------------------------------------------------------------------- */

const subResolvers = loadFilesSync('../modules/**/*.resolver.{js,ts}')

export default subResolvers
