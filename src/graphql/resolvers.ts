/* ------------------------------ Node Modules ------------------------------ */
// import { join } from 'node:path'
/* ------------------------------ Dependencies ------------------------------ */
// import { loadFilesSync } from '@graphql-tools/load-files'
/* ----------------------------- Custom Modules ----------------------------- */
import adminResolver from '../modules/admin/admin.resolver'
import userResolver from '../modules/user/user.resolver'
import authResolver from '../modules/auth/auth.resolver'
/* -------------------------------------------------------------------------- */

// const subResolvers = loadFilesSync('../modules/**/*.resolver.{js,ts}')

const subResolvers = [adminResolver, userResolver, authResolver]

export default subResolvers
