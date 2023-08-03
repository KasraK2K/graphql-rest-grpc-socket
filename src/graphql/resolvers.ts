/* ------------------------------ Dependencies ------------------------------ */
// import { loadFilesSync } from '@graphql-tools/load-files'
import config from 'config'
/* ----------------------------- Custom Modules ----------------------------- */
import { IApplicationConfig } from '../../config/config.interface'
import adminResolver from '../modules/admin/admin.resolver'
import userResolver from '../modules/user/user.resolver'
import authResolver from '../modules/auth/auth.resolver'
/* -------------------------------------------------------------------------- */

const applicationConfig: IApplicationConfig = config.get('application')

// const subResolvers = loadFilesSync('**/*.resolver.{js,ts}', {
//     recursive: true,
//     useRequire: true,
//     globOptions: {
//         cwd: resolve(process.cwd(), './src/modules')
//     }
// })

const globalResolver = {
    Query: {
        information: {
            site_name: applicationConfig.site_name,
            api_version: applicationConfig.api_version,
            front_version: applicationConfig.front_version,
            portal_version: applicationConfig.portal_version,
            app_version: applicationConfig.app_version
        }
    }
}

const subResolvers = [globalResolver, adminResolver, userResolver, authResolver]

export default subResolvers
