/* ----------------------------- Custom Modules ----------------------------- */
import { IContext } from '../../graphql/context'
import { IUser } from './constants/interfaces'
/* -------------------------------------------------------------------------- */

class UserService {
    loginLocalUser({ dataSource }: IContext): IUser {
        return dataSource.user.repo.findOneUser()
    }

    registerLocalUser({ dataSource }: IContext): IUser {
        return dataSource.user.repo.findOneUser()
    }
}

export default new UserService()
