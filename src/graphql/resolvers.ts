/* ------------------------------ Dependencies ------------------------------ */
// import { loadFilesSync } from '@graphql-tools/load-files'
/* ----------------------------- Custom Modules ----------------------------- */
import adminResolver from '../modules/admin/admin.resolver'
import userResolver from '../modules/user/user.resolver'
import authResolver from '../modules/auth/auth.resolver'
/* -------------------------------------------------------------------------- */

// const subResolvers = loadFilesSync('**/*.resolver.{js,ts}', {
//     recursive: true,
//     useRequire: true,
//     globOptions: {
//         cwd: resolve(process.cwd(), './src/modules')
//     }
// })

const subResolvers = [adminResolver, userResolver, authResolver]

export default subResolvers
