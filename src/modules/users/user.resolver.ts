/* ------------------------------ Node Modules ------------------------------ */
import { IContext } from '../../graphql/context'
import { IUserAuthArgs, ILocalUserAuthResponse } from './constants/interfaces'
/* -------------------------------------------------------------------------- */

const resolvers = {
    Query: {
        loginLocalUser: (
            _: ILocalUserAuthResponse,
            args: IUserAuthArgs,
            contextValue: IContext
        ): ILocalUserAuthResponse => {
            console.log(args)
            const service = contextValue.dataSource.user.service
            const user = service.loginLocalUser(contextValue)
            const token = 'some sample token'
            return { token, user }
        },

        registerLocalUser: (
            _: ILocalUserAuthResponse,
            args: IUserAuthArgs,
            contextValue: IContext
        ): ILocalUserAuthResponse => {
            console.log(args)
            const service = contextValue.dataSource.user.service
            const user = service.registerLocalUser(contextValue)
            const token = 'some sample token'
            return { token, user }
        }
    }
}

export default resolvers
